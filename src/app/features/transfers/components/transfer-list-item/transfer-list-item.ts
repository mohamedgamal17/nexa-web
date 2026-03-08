import { Component, input, output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroArrowDownLeft,
  heroArrowUpLeft,
  heroArrowUpRight,
  heroBuildingLibrary,
} from '@ng-icons/heroicons/outline';
import { Transfer } from '../../interfaces/transfer.interface';
import { TransferType } from '../../enums/transfer-type.enum';
import { TransferStatus } from '../../enums/transfer-status.enum';
import { TransferDirection } from '../../enums/transfer-direction.enum';

import { BankAccountNumberPipe } from '../../../banks/pips/bank-account-number-pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transfer-list-item',
  imports: [NgIcon, BankAccountNumberPipe, CommonModule],
  templateUrl: './transfer-list-item.html',
  styleUrl: './transfer-list-item.scss',
  viewProviders: [
    provideIcons({ heroBuildingLibrary, heroArrowUpRight, heroArrowDownLeft }),
  ],
})
export class TransferListItem {
  transfer = input<Transfer>();
  TransferType = TransferType;
  clicked = output<void>();

  getIcon(transfer: Transfer) {
    if (transfer.type == TransferType.bank) {
      return 'heroBuildingLibrary';
    }
    return 'heroArrowUpRight';
  }

  getIconColor(transfer: Transfer) {
    if (transfer.type == TransferType.bank) {
      return 'text-info';
    }
    return 'text-danger';
  }

  getTagColor(transfer: Transfer) {
    if (transfer.status === TransferStatus.pending) {
      return 'bg-secondary-subtle text-secondary';
    } else if (transfer.status === TransferStatus.processing) {
      return 'bg-info-subtle text-info';
    } else if (transfer.status === TransferStatus.completed) {
      return 'bg-success-subtle text-success';
    }
    return 'bg-danger-subtle text-danger';
  }

  getTagText(transfer: Transfer) {
    if (transfer.status === TransferStatus.pending) {
      return 'pending';
    } else if (transfer.status === TransferStatus.processing) {
      return 'processing';
    } else if (transfer.status === TransferStatus.completed) {
      return 'completed';
    }
    return 'faild';
  }
  getAmountColor() {
    return this.transfer()?.type === TransferType.network ||
      this.transfer()?.direction === TransferDirection.depit
      ? 'text-danger'
      : 'text-success';
  }

  getAmountSign(transfer: Transfer) {
    if (transfer.direction === TransferDirection.depit) {
      return '-';
    }
    return '+';
  }
}
