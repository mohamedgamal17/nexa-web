import { Component, input } from '@angular/core';
import { Bank } from '../../interfaces/bank.interface';
import { Building2, LucideAngularModule } from 'lucide-angular';
import { CardModule } from 'primeng/card';
import { BankAccountNumberPipe } from "../../pips/bank-account-number-pipe";

@Component({
  selector: 'app-bank-card',
  imports: [LucideAngularModule, CardModule, BankAccountNumberPipe],
  templateUrl: './bank-card.html',
  styleUrl: './bank-card.scss',
})
export class BankCard {
  bank = input.required<Bank>()

  Building2 = Building2
}
