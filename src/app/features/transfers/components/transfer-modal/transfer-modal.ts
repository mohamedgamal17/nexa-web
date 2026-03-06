import { CommonModule } from '@angular/common';
import { Component, inject, input, model, OnInit, output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Wallet as WalletIcon } from 'lucide-angular';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { Wallet } from '../../../wallets/interfaces/wallet.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { heroCurrencyDollar, heroUser } from '@ng-icons/heroicons/outline';
import { WalletNumberPipe } from '../../../wallets/pipes/wallet-number-pipe';
import { Gender } from '../../../customers/enums/gender.enum';
import { WalletSearch } from '../../../wallets/components/wallet-search/wallet-search';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputGroupModule } from 'primeng/inputgroup';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputError } from '../../../../shared/components/input-error/Input-error';
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
    WalletNumberPipe,
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
  private translateService = inject(TranslateService);

  private fb = inject(FormBuilder);

  activeWallet = input<Wallet>();

  visible = model(false);
  wallets = input<Wallet[]>([]);

  walletSearch = output<string>();

  transferForm: FormGroup;

  ngOnInit(): void {
    this.transferForm = this.fb.group({
      reciverWallet: [, [Validators.required, Validators.maxLength(250)]],
      amount: [0, [Validators.required, Validators.min(1), Validators.max(1000000)]],
    });
  }

  toggleDialog() {
    this.visible.set(!this.visible());
  }

  search($event: string) {
    this.walletSearch.emit($event);
    console.log('recived');
  }

  getMaxAmount() {
    return (this.activeWallet()?.balance ?? 0 > 0) ? this.activeWallet()?.balance : 1000;
  }

  setMaxValue() {
    this.transferForm.patchValue({
      amount: this.activeWallet()?.balance ?? 0,
    });
  }
}
