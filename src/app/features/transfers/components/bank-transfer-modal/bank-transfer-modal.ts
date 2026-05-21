import {
  Component,
  effect,
  inject,
  input,
  model,
  OnInit,
  output,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
import {
  heroBuildingLibrary,
  heroBuildingOffice,
  heroCurrencyDollar,
  heroExclamationCircle,
} from '@ng-icons/heroicons/outline';
import { Store } from '@ngrx/store';
import {
  selectBankModalType,
  selectShowBankModal,
  selectShowP2PModal,
} from '../../../wallets/state/wallet.selectors';
import { toSignal } from '@angular/core/rxjs-interop';
import { walletCardActions } from '../../../wallets/state/wallet.actions';

@Component({
  selector: 'app-bank-transfer-modal',
  imports: [
    DialogModule,
    NgIcon,
    ButtonModule,
    ReactiveFormsModule,
    CommonModule,
    TranslateModule,
    InputError,
    InputGroupAddonModule,
    InputGroupModule,
    InputNumberModule,
    BankSelect,
    BankSelectSkeleton,
    SkeletonModule,
  ],
  templateUrl: './bank-transfer-modal.html',
  styleUrl: './bank-transfer-modal.scss',
  viewProviders: [
    provideIcons({
      heroCurrencyDollar,
      heroBuildingLibrary,
      heroExclamationCircle,
    }),
  ],
})
export class BankTransferModal implements OnInit {
  private fb = inject(FormBuilder);
  private store = inject(Store);

  visible = toSignal(this.store.select(selectShowBankModal), {
    initialValue: false,
  });

  type = toSignal(this.store.select(selectBankModalType), {
    initialValue: 'deposit',
  });

  bankTansferForm: FormGroup;

  loading = input(false);

  submiting = input(false);

  linking = input(false);

  banks = input<Bank[]>([]);

  activeWallet = input<Wallet>();

  submitied = output<{
    bank: Bank;
    amount: number;
    type: 'withdraw' | 'deposit';
  }>();

  linkBankAccount = output<void>();

  constructor() {
    effect(() => {
      if (!this.visible()) {
        this.bankTansferForm?.reset();
      }
    });
  }

  ngOnInit(): void {
    this.bankTansferForm = this.fb.group({
      bank: [, [Validators.required]],
      amount: [
        0,
        [Validators.required, Validators.max(1000000), Validators.min(1)],
      ],
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
    this.store.dispatch(walletCardActions.toggleBankTransferModal({}));
  }

  handleSubmit($event: SubmitEvent) {
    $event.preventDefault();
    if (this.bankTansferForm.valid) {
      console.log(this.bankTansferForm.value);
      var ob = {
        ...this.bankTansferForm.value,
        type: this.type(),
      };

      console.log(ob);
      this.submitied.emit({
        ...this.bankTansferForm.value,
        type: this.type(),
      });
    }
  }

  handleLinkBankAccount() {
    this.linkBankAccount.emit();
  }

  getMaxAmount() {
    return (this.activeWallet()?.balance ?? 0 > 0)
      ? this.activeWallet()?.balance
      : 1000;
  }

  setMaxValue() {
    this.bankTansferForm.patchValue({
      amount: this.activeWallet()?.balance ?? 0,
    });
  }
}
