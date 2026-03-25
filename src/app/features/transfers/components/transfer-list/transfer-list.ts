import { Component, inject, input, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroBuildingLibrary } from '@ng-icons/heroicons/outline';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { Transfer } from '../../interfaces/transfer.interface';
import { TransferListItem } from '../transfer-list-item/transfer-list-item';
import { TransferListItemSkeleton } from '../transfer-list-item-skeleton/transfer-list-item-skeleton';
import { TransferDetails } from '../transfer-details/transfer-details';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { ToastModule } from 'primeng/toast';
import { ClipboardModule, Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-transfer-list',
  imports: [
    NgIcon,
    TagModule,
    CardModule,
    TransferListItem,
    TransferListItemSkeleton,
    TransferDetails,
    ClipboardModule,
    ToastModule,
  ],
  templateUrl: './transfer-list.html',
  styleUrl: './transfer-list.scss',
  viewProviders: [provideIcons({ heroBuildingLibrary })],
  providers: [MessageService],
})
export class TransferList {
  private clipboard = inject(Clipboard);
  private messageService = inject(MessageService);
  private translateService = inject(TranslateService);

  transfers = input<Transfer[]>([]);
  loading = input(true);
  skeletonSize = input(5);
  skeletonArray = Array(this.skeletonSize());
  transferModalData = signal<Transfer | null>(null);
  transfeDetailsVisible = signal(false);

  showTransferDetails(transfer: Transfer) {
    this.transfeDetailsVisible.set(true);
    this.transferModalData.set(transfer);
  }

  copyTransferNumber($event: { text: string }) {
    console.log('c');
    this.clipboard.copy($event.text);
    this.messageService.add({
      detail: this.translateService.instant('toast.transferCopied.message'),
      severity: 'contrast',
      key: 'br',
      life: 3000,
    });
  }
}
