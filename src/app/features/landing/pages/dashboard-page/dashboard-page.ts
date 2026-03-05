import { Component } from '@angular/core';
import { WalletCard } from '../../../wallets/component/wallet-card/wallet-card';

@Component({
  selector: 'app-dashboard-page',
  imports: [WalletCard],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage {}
