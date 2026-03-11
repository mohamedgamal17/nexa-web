import { Component, effect, input, model, output } from '@angular/core';
import { Building2, LockIcon, LucideAngularModule, ShieldCheck , CircleAlert } from 'lucide-angular';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Bank } from '../../interfaces/bank.interface';
import { BankAccountNumberPipe } from "../../pips/bank-account-number-pipe";
import { LinkedBankState } from '../../interfaces/linked-bank-state.interface';

@Component({
  selector: 'app-bank-modal',
  imports: [DialogModule, LucideAngularModule, ButtonModule, BankAccountNumberPipe],
  templateUrl: './bank-modal.html',
  styleUrl: './bank-modal.scss',
})
export class BankModal {

  visible = model(false)
  linkedBank = input<LinkedBankState>({progress : 'Pending'})
  linked = output()



  Building2 = Building2
  ShieldCheck =ShieldCheck
  LockIcon = LockIcon
  CircleAlert = CircleAlert

  constructor(){
    effect(()=> console.log(this.linkedBank()))
  }
  getErrorTitle(){
    console.log(this.linkedBank().error)
    return this.linkedBank()?.error?.title ?? 'Unexpected error'
  }

  getErrorMessage(){
    return this.linkedBank()?.error?.message ?? this.linkedBank().error 
  }
}
