import { Component, OnInit, signal } from '@angular/core';
import { WalletCard } from '../../../wallets/components/wallet-card/wallet-card';
import { WalletContainer } from '../../../wallets/containers/wallet-container/wallet-container';

@Component({
  selector: 'app-dashboard-page',
  imports: [WalletCard, WalletContainer],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage implements OnInit {
  isWalletLoaded = signal(false);

  ngOnInit(): void {}
}
