import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { heroArrowDownLeft, heroArrowUpRight } from '@ng-icons/heroicons/outline';
import { LUCIDE_ICONS, LucideAngularModule, LucideIconProvider, Plus, Wallet } from 'lucide-angular';
import { NgIcon, provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-wallet-card',
  imports: [Card, CommonModule, Button, LucideAngularModule, NgIcon],
  templateUrl: './wallet-card.html',
  styleUrl: './wallet-card.scss',
  viewProviders: [provideIcons({ heroArrowUpRight, heroArrowDownLeft })],
})
export class WalletCard {
  Wallet = Wallet;
}
