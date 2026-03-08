import { Component, inject, input, model, output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Transfer } from '../../interfaces/transfer.interface';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { ButtonModule } from 'primeng/button';
import {
  heroArrowDownLeftSolid,
  heroArrowUpRightSolid,
} from '@ng-icons/heroicons/solid';
import {
  heroArrowDownLeft,
  heroArrowRight,
  heroClock,
} from '@ng-icons/heroicons/outline';
import { LucideAngularModule, Wallet as WalletIcon } from 'lucide-angular';
import { TransferType } from '../../enums/transfer-type.enum';
import { TransferDirection } from '../../enums/transfer-direction.enum';
import { BankAccountNumberPipe } from '../../../banks/pips/bank-account-number-pipe';
import { WalletNumberPipe } from '../../../wallets/pipes/wallet-number-pipe';
import { CommonModule } from '@angular/common';
import { TransferStatus } from '../../enums/transfer-status.enum';
import { ClipboardModule, Clipboard } from '@angular/cdk/clipboard';
import { MessageService } from 'primeng/api';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-transfer-details',
  imports: [
    DialogModule,
    NgIcon,
    ButtonModule,
    LucideAngularModule,
    CommonModule,
    BankAccountNumberPipe,
    WalletNumberPipe,
    ClipboardModule,
    TranslateModule,
  ],
  templateUrl: './transfer-details.html',
  styleUrl: './transfer-details.scss',
  viewProviders: [
    provideIcons({
      heroArrowUpRightSolid,
      heroClock,
      heroArrowRight,
      heroArrowDownLeftSolid,
    }),
  ],
  providers: [MessageService],
})
export class TransferDetails {
  transfer = input<Transfer | null>(null);
  visible = model(false);
  WalletIcon = WalletIcon;
  TransferType = TransferType;
  TransferDirection = TransferDirection;

  textCopied = output<{ text: string }>();

  getTransferIcon() {
    if (
      this.transfer()?.type === TransferType.network ||
      (this.transfer()?.type === TransferType.bank &&
        this.transfer()?.direction === TransferDirection.depit)
    ) {
      return 'heroArrowUpRightSolid';
    } else {
      return 'heroArrowDownLeftSolid';
    }
  }

  getTransferTitle() {
    if (this.transfer()?.type === TransferType.network) {
      return 'Wallet to wallet';
    }

    if (this.transfer()?.direction === TransferDirection.credit) {
      return 'Bank to wallet';
    }

    return 'Wallet to bank';
  }

  getSourceName() {
    if (
      this.transfer()?.type === TransferType.network ||
      (this.transfer()?.type === TransferType.bank &&
        this.transfer()?.direction === TransferDirection.depit)
    ) {
      return (
        this.transfer()?.wallet.customer?.info.firstName +
        ' ' +
        this.transfer()?.wallet.customer?.info.lastName
      );
    } else {
      return this.transfer()?.fundingResource?.bankName;
    }
  }

  getSourceIcon() {
    if (
      this.transfer()?.type === TransferType.network ||
      (this.transfer()?.type === TransferType.bank &&
        this.transfer()?.direction === TransferDirection.depit)
    ) {
      return 'pi-wallet';
    } else {
      return 'pi-building-columns';
    }
  }

  getDestenationName() {
    if (this.transfer()?.type === TransferType.network) {
      return (
        this.transfer()?.reciver?.customer?.info.firstName +
        ' ' +
        this.transfer()?.reciver?.customer?.info.lastName
      );
    } else {
      if (this.transfer()?.direction === TransferDirection.credit) {
        return (
          this.transfer()?.wallet.customer?.info.firstName +
          ' ' +
          this.transfer()?.wallet.customer?.info.lastName
        );
      }
      return this.transfer()?.fundingResource?.bankName;
    }
  }

  getDestenationIcon() {
    if (
      this.transfer()?.type === TransferType.network ||
      this.transfer()?.direction === TransferDirection.credit
    ) {
      return 'pi-wallet';
    } else {
      return 'pi-building-columns';
    }
  }

  getAmountSign() {
    return this.transfer()?.type === TransferType.network ||
      this.transfer()?.direction === TransferDirection.depit
      ? '-'
      : '+';
  }

  getAmountColor() {
    return this.transfer()?.type === TransferType.network ||
      this.transfer()?.direction === TransferDirection.depit
      ? 'text-danger'
      : 'text-success';
  }

  getBadgeColor() {
    if (this.transfer()?.status === TransferStatus.pending) {
      return 'bg-secondary-subtle text-secondary';
    } else if (this.transfer()?.status === TransferStatus.processing) {
      return 'bg-info-subtle text-info';
    } else if (this.transfer()?.status === TransferStatus.completed) {
      return 'bg-success-subtle text-success';
    }
    return 'bg-danger-subtle text-danger';
  }

  getBadgeText() {
    if (this.transfer()?.status === TransferStatus.pending) {
      return 'pending';
    } else if (this.transfer()?.status === TransferStatus.processing) {
      return 'processing';
    } else if (this.transfer()?.status === TransferStatus.completed) {
      return 'completed';
    }
    return 'faild';
  }
}
