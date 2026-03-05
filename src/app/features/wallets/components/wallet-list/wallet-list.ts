import { Component, input } from '@angular/core';
import { Wallet } from '../../interfaces/wallet.interface';
import { WalletListItem } from '../wallet-list-item/wallet-list-item';

@Component({
  selector: 'app-wallet-list',
  imports: [WalletListItem],
  templateUrl: './wallet-list.html',
  styleUrl: './wallet-list.scss',
})
export class WalletList {
  wallets = input<Wallet[]>([]);
  activeWallet = input<Wallet>();
}
