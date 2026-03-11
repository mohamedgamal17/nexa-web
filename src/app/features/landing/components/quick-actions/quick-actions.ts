import { Component, inject, Inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroArrowUpRight,
  heroBuildingLibrary,
  heroMinus,
  heroPlus,
  heroUser,
} from '@ng-icons/heroicons/outline';
import { CardModule } from 'primeng/card';
import { QuickActionItem } from '../quick-action-item/quick-action-item';
import { Store } from '@ngrx/store';
import { walletCardActions } from '../../../wallets/state/wallet.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quick-actions',
  imports: [CardModule, NgIcon, QuickActionItem],
  templateUrl: './quick-actions.html',
  styleUrl: './quick-actions.scss',
  viewProviders: [
    provideIcons({ heroArrowUpRight, heroPlus, heroMinus, heroUser , heroBuildingLibrary }),
  ],
})
export class QuickActions {
  private store = inject(Store);
  private router = inject(Router);

  toggleP2PTransferModal() {
    this.store.dispatch(walletCardActions.toggleP2PTransferModal());
  }

  toggleBankTransferModal(type: 'deposit' | 'withdraw') {
    this.store.dispatch(
      walletCardActions.toggleBankTransferModal({ modalType: type }),
    );
  }

  navigateToUrl(url: string) {
    this.router.navigateByUrl(url);
  }
}
