import { CommonModule } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { heroArrowDownLeft, heroArrowUpRight } from '@ng-icons/heroicons/outline';
import { LUCIDE_ICONS, LucideAngularModule, LucideIconProvider, Plus, Wallet as WalletIcon } from 'lucide-angular';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { SkeletonModule } from 'primeng/skeleton';
import { Wallet } from '../../interfaces/wallet.interface';

@Component({
  selector: 'app-wallet-card',
  imports: [Card, CommonModule, LucideAngularModule, NgIcon, SkeletonModule],
  templateUrl: './wallet-card.html',
  styleUrl: './wallet-card.scss',
  viewProviders: [provideIcons({ heroArrowUpRight, heroArrowDownLeft })],
})
export class WalletCard {
  loading = input<boolean>(true);
  wallet = input<Wallet>();
  WalletIcon = WalletIcon;
}
