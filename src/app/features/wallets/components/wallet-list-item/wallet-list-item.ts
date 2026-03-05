import { Component, input } from '@angular/core';
import { LucideAngularModule, Wallet as WalletIcon } from 'lucide-angular';
import { Wallet } from '../../interfaces/wallet.interface';
import { CommonModule } from '@angular/common';
import { heroCheck } from '@ng-icons/heroicons/outline';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { WalletNumberPipe } from '../../pipes/wallet-number-pipe';

@Component({
  selector: 'app-wallet-list-item',
  imports: [LucideAngularModule, CommonModule, NgIcon, WalletNumberPipe],
  templateUrl: './wallet-list-item.html',
  styleUrl: './wallet-list-item.scss',
  viewProviders: [provideIcons({ heroCheck })],
})
export class WalletListItem {
  wallet = input<Wallet>();
  active = input(false);
  WalletIcon = WalletIcon;
}
