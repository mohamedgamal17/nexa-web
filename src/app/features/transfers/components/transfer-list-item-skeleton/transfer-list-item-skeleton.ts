import { Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-transfer-list-item-skeleton',
  imports: [SkeletonModule],
  templateUrl: './transfer-list-item-skeleton.html',
  styleUrl: './transfer-list-item-skeleton.scss',
})
export class TransferListItemSkeleton {}
