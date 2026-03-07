import { Component, computed, effect, inject, model, OnInit, signal } from '@angular/core';
import { Wallet } from '../../interfaces/wallet.interface';
import { mergeMap, of, single, Subscription, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsWalletStateLoaded, selectWalletPaging, walletState } from '../../state/wallet.selectors';
import { walletActions } from '../../state/wallet.actions';
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

@Component({
  selector: 'app-wallet-container',
  imports: [WalletCard, AlertError, WalletList, TransferModal, BankTransferModal, TranslateModule],
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

  isLoaded = signal(false);
  isLoading = signal(false);
  error = signal<ErrorModel | null>(null);
  hasError = computed(() => this.error() != null);
  wallets = signal<Wallet[]>([]);
  activeWallet = signal<Wallet | null>(null);
  paging = signal<PagingState | null>(null);
  searchWallets = signal<Wallet[] | []>([]);
  submitingNetworkTransfer = signal(false);
  submitingBankTransfer = signal(false);

  subscriptions: Subscription[] = [];

  transferModelView = model(false);
  transferBankView = model(false);
  transferBankType = model<'withdraw' | 'deposit'>('withdraw');
  pagingLength = 10;

  constructor() {
    this.loadWalletsIfNotLoaded();
  }

  ngOnInit(): void {
    this.subscribeToWalletState();
  }

  searchWalletByNumber($event: string) {
    const sub = this.walletService.getAllWallets({ number: $event, skip: 0, length: this.pagingLength }).subscribe({
      next: (v) => this.searchWallets.set(v.data),
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
        next: (v) => {
          this.messageService.add({
            summary: this.translateService.instant('toast.transfer.network.completed.summary'),
            detail: this.translateService.instant('toast.transfer.network.completed.message', { wallet: $event.reciverWallet.number }),
            severity: 'success',
          });
          this.submitingNetworkTransfer.set(false);
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

  createBankTransfer($event: { bank: Bank; amount: number; type: 'withdraw' | 'deposit' }) {
    var activeWallet = this.activeWallet();

    if (activeWallet) {
      this.submitingBankTransfer.set(true);
      var req = {
        walletId: activeWallet.id,
        fundingResourceId: $event.bank.id,
        amount: $event.amount,
        direction: $event.type == 'deposit' ? TransferDirection.depit : TransferDirection.credit,
      };

      const sub = this.transferService.createBankTransfer(req).subscribe({
        next: (val) => {
          if (val.direction == TransferDirection.depit) {
            this.messageService.add({
              summary: this.translateService.instant('toast.transfer.bank.withdraw.completed.summary'),
              detail: this.translateService.instant('toast.transfer.bank.withdraw.completed.message', { bankAccount: $event.bank.accountNumberLast4 }),
              severity: 'success',
            });
          } else {
            this.messageService.add({
              summary: this.translateService.instant('toast.transfer.bank.deposit.completed.summary'),
              detail: this.translateService.instant('toast.transfer.bank.deposit.completed.message', { bankAccount: $event.bank.accountNumberLast4 }),
              severity: 'success',
            });
          }

          this.submitingBankTransfer.set(false);
        },

        error: (err) => {
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

  private loadWalletsIfNotLoaded() {
    effect(() => {
      const loaded = this.isLoaded();
      if (!loaded) {
        this.store.dispatch(walletActions.loadWallets({ paging: { skip: 0, length: this.pagingLength } }));
      }
    });
  }

  private subscribeToWalletState() {
    const sub = this.store.select(walletState).subscribe((state) => {
      this.isLoaded.set(state.loaded);
      this.isLoading.set(state.isLoading);
      this.error.set(state.error);
      this.wallets.set(state.wallets);
      this.activeWallet.set(state.activeWallet);
      this.paging.set(state.paging);
    });
    this.subscriptions.push(sub);
  }
}
