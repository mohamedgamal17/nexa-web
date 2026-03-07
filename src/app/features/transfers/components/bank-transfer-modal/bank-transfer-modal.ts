import { Component, inject, input, model, OnInit, output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Bank } from '../../../banks/interfaces/bank.interface';
import { TranslateModule } from '@ngx-translate/core';
import { InputError } from '../../../../shared/components/input-error/Input-error';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputNumberModule } from 'primeng/inputnumber';
import { Wallet } from '../../../wallets/interfaces/wallet.interface';
import { CommonModule } from '@angular/common';
import { BankSelect } from '../../../banks/components/bank-select/bank-select';
import { BankSelectSkeleton } from '../../../banks/components/bank-select-skeleton/bank-select-skeleton';
import { SkeletonModule } from 'primeng/skeleton';
import { heroBuildingLibrary, heroBuildingOffice, heroCurrencyDollar, heroExclamationCircle } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-bank-transfer-modal',
  imports: [DialogModule, NgIcon, ButtonModule, ReactiveFormsModule, CommonModule, TranslateModule, InputError, InputGroupAddonModule, InputGroupModule, InputNumberModule, BankSelect, BankSelectSkeleton, SkeletonModule],
  templateUrl: './bank-transfer-modal.html',
  styleUrl: './bank-transfer-modal.scss',
  viewProviders: [provideIcons({ heroCurrencyDollar, heroBuildingLibrary, heroExclamationCircle })],
})
export class BankTransferModal implements OnInit {
  private fb = inject(FormBuilder);

  visible = model(true);

  bankTansferForm: FormGroup;

  type = model<'withdraw' | 'deposit'>('deposit');

  loading = input(false);

  submiting = input(false);

  linking = input(false);

  banks = input<Bank[]>([]);

  activeWallet = input<Wallet>();

  submit = output<{ bank: Bank; amount: number; type: 'withdraw' | 'deposit' }>();

  linkBankAccount = output<void>();

  ngOnInit(): void {
    this.bankTansferForm = this.fb.group({
      bank: [, [Validators.required]],
      amount: [0, [Validators.required, Validators.max(1000000), Validators.min(1)]],
    });
  }

  getModalTitle() {
    if (this.type() == 'deposit') {
      return 'Deposit Funds';
    }
    return 'Withdraw Funds';
  }

  getModalSubTitle() {
    if (this.type() == 'deposit') {
      return 'Instant deposit from your linked bank account.';
    }

    return 'Transfer money to your verified bank account.';
  }

  getButtonText() {
    if (this.type() == 'deposit') {
      return 'Deposit';
    }
    return 'Withdraw';
  }

  toggleModel() {
    this.visible.set(!this.visible());
  }

  handleSubmit($event: SubmitEvent) {
    $event.preventDefault();

    if (this.bankTansferForm.valid) {
      this.submit.emit({
        ...this.bankTansferForm.value,
        type: this.type(),
      });
    }
  }

  handleLinkBankAccount() {
    this.linkBankAccount.emit();
  }

  getMaxAmount() {
    return (this.activeWallet()?.balance ?? 0 > 0) ? this.activeWallet()?.balance : 1000;
  }

  setMaxValue() {
    this.bankTansferForm.patchValue({
      amount: this.activeWallet()?.balance ?? 0,
    });
  }
}
