import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { Wallet } from '../../interfaces/wallet.interface';
import { single, Subscription, tap } from 'rxjs';
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

@Component({
  selector: 'app-wallet-container',
  imports: [WalletCard, AlertError, WalletList, TransferModal],
  templateUrl: './wallet-container.html',
  styleUrl: './wallet-container.scss',
  viewProviders: [provideIcons({ heroExclamationCircle })],
  providers: [MessageService],
})
export class WalletContainer implements OnInit {
  private store = inject(Store);
  private walletService = inject(WalletService);
  private messageService = inject(MessageService);

  isLoaded = signal(false);
  isLoading = signal(false);
  error = signal<ErrorModel | null>(null);
  hasError = computed(() => this.error() != null);
  wallets = signal<Wallet[]>([]);
  activeWallet = signal<Wallet | null>(null);
  paging = signal<PagingState | null>(null);
  searchWallets = signal<Wallet[] | []>([]);
  subscriptions: Subscription[] = [];

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
