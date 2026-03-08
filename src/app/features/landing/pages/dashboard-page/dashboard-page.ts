import { Component, OnInit, signal } from '@angular/core';
import { WalletCard } from '../../../wallets/components/wallet-card/wallet-card';
import { WalletContainer } from '../../../wallets/containers/wallet-container/wallet-container';
import { TransferList } from '../../../transfers/components/transfer-list/transfer-list';
import { RecentTransferContainer } from '../../../transfers/container/recent-transfer-container/recent-transfer-container';
import { QuickActions } from '../../components/quick-actions/quick-actions';

@Component({
  selector: 'app-dashboard-page',
  imports: [
    WalletCard,
    WalletContainer,
    TransferList,
    RecentTransferContainer,
    QuickActions,
  ],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage implements OnInit {
  isWalletLoaded = signal(false);

  ngOnInit(): void {}
}
