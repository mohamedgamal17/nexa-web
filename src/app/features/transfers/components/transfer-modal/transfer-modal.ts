import { CommonModule } from '@angular/common';
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
import { NgIcon, provideIcons } from '@ng-icons/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Wallet as WalletIcon } from 'lucide-angular';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { Wallet } from '../../../wallets/interfaces/wallet.interface';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
} from 'primeng/autocomplete';
import { heroCurrencyDollar, heroUser } from '@ng-icons/heroicons/outline';
import { WalletNumberPipe } from '../../../wallets/pipes/wallet-number-pipe';
import { Gender } from '../../../customers/enums/gender.enum';
import { WalletSearch } from '../../../wallets/components/wallet-search/wallet-search';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputGroupModule } from 'primeng/inputgroup';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputError } from '../../../../shared/components/input-error/Input-error';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { selectShowP2PModal } from '../../../wallets/state/wallet.selectors';
import {
  walletActions,
  walletCardActions,
} from '../../../wallets/state/wallet.actions';
@Component({
  selector: 'app-transfer-modal',
  imports: [
    DialogModule,
    ButtonModule,
    NgIcon,
    ButtonModule,
    TranslateModule,
    SelectModule,
    AutoCompleteModule,
    WalletSearch,
    InputNumberModule,
    InputGroupModule,
    InputGroupAddonModule,
    CommonModule,
    ReactiveFormsModule,
    InputError,
  ],
  templateUrl: './transfer-modal.html',
  styleUrl: './transfer-modal.scss',
  viewProviders: [provideIcons({ heroUser, heroCurrencyDollar })],
})
export class TransferModal implements OnInit {
  private fb = inject(FormBuilder);
  private store = inject(Store);

  activeWallet = input<Wallet>();

  visible = toSignal(this.store.select(selectShowP2PModal), {
    initialValue: false,
  });
  wallets = input<Wallet[]>([]);
  loading = input(false);
  walletSearch = output<string>();
  submitied = output<{ reciverWallet: Wallet; amount: number }>();
  isSubmbitied = signal(false);
  transferForm: FormGroup;

  constructor() {
    effect(() => {
      const visible = this.visible();
      if (!visible) {
        this.transferForm?.reset();
      }
    });
  }

  ngOnInit(): void {
    this.transferForm = this.fb.group({
      reciverWallet: [null, [Validators.required, Validators.maxLength(250)]],
      amount: [
        0,
        [Validators.required, Validators.min(1), Validators.max(1000000)],
      ],
    });
  }

  toggleDialog() {
    this.store.dispatch(walletCardActions.toggleP2PTransferModal());
  }

  handleFormSubmit($event: SubmitEvent) {
    $event.preventDefault();
    this.isSubmbitied.set(true);
    console.log(this.transferForm.value);
    if (this.transferForm.valid) {
      console.log('VAlid');
      var obj = {
        reciverWallet: this.transferForm.value.reciverWallet,
        amount: this.transferForm.value.amount,
      };

      this.submitied.emit(obj);
    }
  }

  search($event: string) {
    this.walletSearch.emit($event);
    console.log('recived');
  }

  getMaxAmount() {
    return (this.activeWallet()?.balance ?? 0 > 0)
      ? this.activeWallet()?.balance
      : 1000;
  }

  setMaxValue() {
    this.transferForm.patchValue({
      amount: this.activeWallet()?.balance ?? 0,
    });
  }

  isAmountInvalid() {
    return this.transferForm.get('amount') && this.isSubmbitied();
  }
}
