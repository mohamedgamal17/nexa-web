import { Component, input } from '@angular/core';
import { Wallet } from '../../interfaces/wallet.interface';
import { WalletListItem } from '../wallet-list-item/wallet-list-item';
import { SkeletonModule } from 'primeng/skeleton';
import { WalletListItemSkeleton } from '../wallet-list-item-skeleton/wallet-list-item-skeleton';

@Component({
  selector: 'app-wallet-list',
  imports: [WalletListItem, SkeletonModule, WalletListItemSkeleton],
  templateUrl: './wallet-list.html',
  styleUrl: './wallet-list.scss',
})
export class WalletList {
  wallets = input<Wallet[]>([]);
  activeWallet = input<Wallet>();
  loading = input(true);
  skeletonSize = Array(3);
}
