import { Component, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroBuildingLibrary } from '@ng-icons/heroicons/outline';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { Transfer } from '../../interfaces/transfer.interface';
import { TransferListItem } from '../transfer-list-item/transfer-list-item';
import { TransferListItemSkeleton } from '../transfer-list-item-skeleton/transfer-list-item-skeleton';

@Component({
  selector: 'app-transfer-list',
  imports: [
    NgIcon,
    TagModule,
    CardModule,
    TransferListItem,
    TransferListItemSkeleton,
  ],
  templateUrl: './transfer-list.html',
  styleUrl: './transfer-list.scss',
  viewProviders: [provideIcons({ heroBuildingLibrary })],
})
export class TransferList {
  transfers = input<Transfer[]>([]);
  loading = input(true);
  skeletonSize = input(5);
  skeletonArray = Array(this.skeletonSize());
}
