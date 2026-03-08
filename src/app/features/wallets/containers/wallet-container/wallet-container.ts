import {
  Component,
  computed,
  effect,
  inject,
  model,
  OnInit,
  signal,
  untracked,
} from '@angular/core';
import { Wallet } from '../../interfaces/wallet.interface';
import { mergeMap, of, single, Subscription, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectActiveWallet,
  selectIsWalletsLoading,
  selectIsWalletStateLoaded,
  selectShowBankModal,
  selectWalletError,
  selectWalletList,
  selectWalletPaging,
  walletState,
} from '../../state/wallet.selectors';
import { walletActions, walletCardActions } from '../../state/wallet.actions';
import { ErrorModel } from '../../../../core/models/error-model.interface';
import { PagingState } from '../../../../core/models/paging-state.interface';
import { WalletCard } from '../../components/wallet-card/wallet-card';
import { DataLoaderError } from '../../../../shared/components/data-loader-error/data-loader-error';
import { provideIcons } from '@ng-icons/core';
import { heroExclamationCircle } from '@ng-icons/heroicons/outline';
import { AlertError } from '../../../../shared/components/alert-error/alert-error';
import { WalletList } from '../../components/wallet-list/wallet-list';
import { TransferModal } from '../../../transfers/components/transfer-modal/transfer-modal';
import { WalletSearch } from '../../components/wallet-search/wallet-search';
import { WalletService } from '../../services/wallet.service';
import { MessageService } from 'primeng/api';
import { TransferServiceService as TransferService } from '../../../transfers/services/transfer-service.service';
import { BankTransferModal } from '../../../transfers/components/bank-transfer-modal/bank-transfer-modal';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Bank } from '../../../banks/interfaces/bank.interface';
import { TransferDirection } from '../../../transfers/enums/transfer-direction.enum';
import { StripeService } from '../../../banks/services/stripe.service';
import { BankingTokenService } from '../../../banks/services/banking-token.service';
import { StripeError } from '@stripe/stripe-js';
import { BankService } from '../../../banks/services/bank.service';
import { ToastModule } from 'primeng/toast';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-wallet-container',
  imports: [
    WalletCard,
    AlertError,
    WalletList,
    TransferModal,
    BankTransferModal,
    TranslateModule,
    ToastModule,
  ],
  templateUrl: './wallet-container.html',
  styleUrl: './wallet-container.scss',
  viewProviders: [provideIcons({ heroExclamationCircle })],
  providers: [MessageService],
})
export class WalletContainer implements OnInit {
  private store = inject(Store);
  private walletService = inject(WalletService);
  private transferService = inject(TransferService);
  private messageService = inject(MessageService);
  private translateService = inject(TranslateService);
  private stripeService = inject(StripeService);
  private bankingTokenService = inject(BankingTokenService);
  private bankService = inject(BankService);

  isLoaded = toSignal(this.store.select(selectIsWalletStateLoaded), {
    initialValue: false,
  });
  isLoading = toSignal(this.store.select(selectIsWalletsLoading), {
    initialValue: false,
  });
  error = toSignal(this.store.select(selectWalletError));
  activeWallet = toSignal(this.store.select(selectActiveWallet));
  wallets = toSignal(this.store.select(selectWalletList), { initialValue: [] });
  paging = toSignal(this.store.select(selectWalletPaging));
  hasError = computed(() => this.error() != null);
  transferBankView = toSignal(this.store.select(selectShowBankModal), {
    initialValue: false,
  });

  searchWallets = signal<Wallet[] | []>([]);
  bankLoading = signal(false);
  bankLoaded = signal(false);
  banks = signal<Bank[]>([]);

  submitingNetworkTransfer = signal(false);
  submitingBankTransfer = signal(false);
  linkingBank = signal(false);

  subscriptions: Subscription[] = [];

  pagingLength = 10;

  constructor() {
    effect(() => {
      const loaded = this.isLoaded();
      if (!loaded) {
        this.store.dispatch(
          walletActions.loadWallets({
            paging: { skip: 0, length: this.pagingLength },
          }),
        );
      }
    });

    this.loadWalletsIfNotLoaded();
    this.loadBanksOnModalView();
  }

  ngOnInit(): void {}

  searchWalletByNumber($event: string) {
    const sub = this.walletService
      .getAllWallets({ number: $event, skip: 0, length: this.pagingLength })
      .subscribe({
        next: v => this.searchWallets.set(v.data),
        error: (err: ErrorModel) =>
          this.messageService.add({
            summary: err.title,
            text: err.message,
            severity: 'error',
          }),
      });
  }

  createNetworkTransfer($event: { reciverWallet: Wallet; amount: number }) {
    var activeWallet = this.activeWallet();

    if (activeWallet) {
      var req = {
        senderId: this.activeWallet()!.id,
        reciverId: $event.reciverWallet.id,
        amount: $event.amount,
      };

      this.submitingNetworkTransfer.set(true);

      const sub = this.transferService.createNetworkTransfer(req).subscribe({
        next: v => {
          this.messageService.add({
            summary: this.translateService.instant(
              'toast.transfer.network.completed.summary',
            ),
            detail: this.translateService.instant(
              'toast.transfer.network.completed.message',
              {
                wallet: $event.reciverWallet.number,
              },
            ),
            severity: 'success',
          });
          this.submitingNetworkTransfer.set(false);
          this.store.dispatch(
            walletActions.loadWallets({
              paging: { length: this.pagingLength, skip: 0 },
            }),
          );
        },

        error: (err: ErrorModel) => {
          this.messageService.add({
            summary: err.title,
            detail: err.message,
            severity: 'error',
          });
          this.submitingNetworkTransfer.set(false);
        },
      });

      this.subscriptions.push(sub);
    }
  }

  createBankTransfer($event: {
    bank: Bank;
    amount: number;
    type: 'withdraw' | 'deposit';
  }) {
    console.log('recived');
    var activeWallet = this.activeWallet();

    console.log($event);
    if (activeWallet) {
      this.submitingBankTransfer.set(true);
      var req = {
        walletId: activeWallet.id,
        fundingResourceId: $event.bank.id,
        amount: $event.amount,
        direction:
          $event.type == 'deposit'
            ? TransferDirection.credit
            : TransferDirection.depit,
      };

      const sub = this.transferService.createBankTransfer(req).subscribe({
        next: val => {
          if (val.direction == TransferDirection.depit) {
            this.messageService.add({
              summary: this.translateService.instant(
                'toast.transfer.bank.withdraw.completed.summary',
              ),
              detail: this.translateService.instant(
                'toast.transfer.bank.withdraw.completed.message',
                {
                  bankAccount: $event.bank.accountNumberLast4,
                },
              ),
              severity: 'success',
            });
          } else {
            this.messageService.add({
              summary: this.translateService.instant(
                'toast.transfer.bank.deposit.completed.summary',
              ),
              detail: this.translateService.instant(
                'toast.transfer.bank.deposit.completed.message',
                {
                  bankAccount: $event.bank.accountNumberLast4,
                },
              ),
              severity: 'success',
            });
          }

          this.store.dispatch(
            walletActions.loadWallets({
              paging: { length: this.pagingLength, skip: 0 },
            }),
          );
          this.store.dispatch(walletCardActions.toggleP2PTransferModal());
          this.submitingBankTransfer.set(false);
        },

        error: err => {
          this.messageService.add({
            summary: err.title,
            detail: err.message,
            severity: 'error',
          });
          this.submitingNetworkTransfer.set(false);
        },
      });
    }
  }

  linkBankAccount() {
    this.linkingBank.set(true);

    var sub = this.bankingTokenService
      .create({})
      .pipe(
        mergeMap(resp => this.stripeService.collectBankAccount(resp.token)),
        mergeMap(resp => this.bankingTokenService.complete({ token: resp.id })),
      )
      .subscribe({
        next: resp => {
          this.messageService.add({
            summary: this.translateService.instant(
              'toast.bank.linking.summary',
            ),
            detail: this.translateService.instant('toast.bank.linking.message'),
            severity: 'success',
          });
          const banks = this.banks();
          this.banks.set([resp, ...banks]);
          this.linkingBank.set(false);
        },
        error: (err: ErrorModel | StripeError | any) => {
          console.log(err);
          this.linkingBank.set(false);
        },
      });

    this.subscriptions.push(sub);
  }

  private loadWalletsIfNotLoaded() {
    effect(() => {
      const loaded = this.isLoaded();
      if (!loaded) {
        this.store.dispatch(
          walletActions.loadWallets({
            paging: { skip: 0, length: this.pagingLength },
          }),
        );
      }
    });
  }

  private loadBanksOnModalView() {
    effect(() => {
      var viewModal = this.transferBankView();

      if (viewModal) {
        const loaded = untracked(() => this.bankLoaded());
        if (!loaded) {
          this.bankLoading.set(true);
          const sub = this.bankService
            .getAllBanks({ skip: 0, length: 10 })
            .subscribe({
              next: resp => {
                this.bankLoading.set(false);
                this.bankLoaded.set(true);
                this.banks.set(resp.data);
                console.log(this.banks());
              },

              error: (err: ErrorModel) => {
                this.messageService.add({
                  summary: err.title,
                  detail: err.message,
                });
                this.bankLoading.set(false);
              },
            });
        }
      }
    });
  }
}
