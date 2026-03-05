import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { Wallet } from '../../interfaces/wallet.interface';
import { Subscription, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsWalletStateLoaded, selectWalletPaging, walletState } from '../../state/wallet.selectors';
import { walletActions } from '../../state/wallet.actions';
import { ErrorModel } from '../../../../core/models/error-model.interface';
import { PagingState } from '../../../../core/models/paging-state.interface';
import { WalletCard } from '../../component/wallet-card/wallet-card';
import { DataLoaderError } from '../../../../shared/components/data-loader-error/data-loader-error';
import { provideIcons } from '@ng-icons/core';
import { heroExclamationCircle } from '@ng-icons/heroicons/outline';
import { AlertError } from '../../../../shared/components/alert-error/alert-error';

@Component({
  selector: 'app-wallet-container',
  imports: [WalletCard, DataLoaderError, AlertError],
  templateUrl: './wallet-container.html',
  styleUrl: './wallet-container.scss',
  viewProviders: [provideIcons({ heroExclamationCircle })],
})
export class WalletContainer implements OnInit {
  private store = inject(Store);

  isLoaded = signal(false);
  isLoading = signal(false);
  error = signal<ErrorModel | null>(null);
  hasError = computed(() => this.error() != null);
  wallets = signal<Wallet[]>([]);
  activeWallet = signal<Wallet | null>(null);
  paging = signal<PagingState | null>(null);
  subscriptions: Subscription[] = [];

  pagingLength = 10;

  constructor() {
    this.subscribeToWalletState();
    this.loadWalletsIfNotLoaded();
  }

  ngOnInit(): void {}

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
