import { Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-wallet-list-item-skeleton',
  imports: [SkeletonModule],
  templateUrl: './wallet-list-item-skeleton.html',
  styleUrl: './wallet-list-item-skeleton.scss',
})
export class WalletListItemSkeleton {}
