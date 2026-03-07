import { CommonModule } from '@angular/common';
import { Component, input, model, signal } from '@angular/core';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { heroArrowDownLeft, heroArrowUpRight, heroMinus, heroPlus } from '@ng-icons/heroicons/outline';
import { LUCIDE_ICONS, LucideAngularModule, LucideIconProvider, Plus, Wallet as WalletIcon } from 'lucide-angular';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { SkeletonModule } from 'primeng/skeleton';
import { Wallet } from '../../interfaces/wallet.interface';

@Component({
  selector: 'app-wallet-card',
  imports: [Card, CommonModule, LucideAngularModule, NgIcon, SkeletonModule],
  templateUrl: './wallet-card.html',
  styleUrl: './wallet-card.scss',
  viewProviders: [provideIcons({ heroArrowUpRight, heroArrowDownLeft, heroPlus, heroMinus })],
})
export class WalletCard {
  loading = input<boolean>(true);
  wallet = input<Wallet>();
  WalletIcon = WalletIcon;

  transferModelView = model(false);
  transferBankView = model(false);
  transferBankType = model<'withdraw' | 'deposit'>('withdraw');

  showDepositModal() {
    this.transferBankView.set(true);
    this.transferBankType.set('deposit');
  }

  showWithdrawModal() {
    this.transferBankView.set(true);
    this.transferBankType.set('withdraw');
  }
}
