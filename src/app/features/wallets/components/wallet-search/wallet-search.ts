import { Component, effect, forwardRef, Host, inject, Injector, input, OnInit, Optional, output, Self, signal, Signal, SkipSelf } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { AutoComplete, AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { WalletNumberPipe } from '../../pipes/wallet-number-pipe';
import { Gender } from '../../../customers/enums/gender.enum';
import { Wallet } from '../../interfaces/wallet.interface';
import { ControlValueAccessor, FormControl, FormGroupDirective, FormsModule, NG_VALUE_ACCESSOR, NgControl, NgForm } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { COUNTRIES } from '../../../../core/constants/countries.data';
import { heroUser } from '@ng-icons/heroicons/outline';
import { SelectChangeEvent } from 'primeng/select';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
@Component({
  selector: 'app-wallet-search',
  imports: [AutoComplete, NgIcon, WalletNumberPipe, FormsModule, ButtonModule, InputGroupModule, InputGroupAddonModule],
  templateUrl: './wallet-search.html',
  styleUrl: './wallet-search.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WalletSearch),
      multi: true,
    },
  ],
  viewProviders: [provideIcons({ heroUser })],
})
export class WalletSearch implements OnInit, ControlValueAccessor {
  wallets = input<Wallet[]>([]);
  walletNumberChange = output<string>();
  private injector = inject(Injector);

  control?: NgControl;

  selectedWallet = signal<Wallet | null>(null);
  isDisabled = signal(false);

  private onChange = (value: Wallet | null) => {};
  private onTouched = () => {};

  constructor(@Host() private form: FormGroupDirective) {
    effect(() => {
      const wallet = this.selectedWallet();
      this.onChange(wallet);
    });
  }
  ngOnInit(): void {
    this.control = this.injector.get(NgControl);

    console.log(this.control);
  }
  writeValue(obj: any): void {
    this.selectedWallet.set(obj);
  }
  registerOnChange(fn: (value: Wallet | null) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  search($event: AutoCompleteCompleteEvent) {
    this.walletNumberChange.emit($event.query);
    console.log('re');
    this.onTouched();
  }

  setSelectedWallet($evet: SelectChangeEvent) {
    this.selectedWallet.set($evet.value);
    this.onTouched();
  }

  removeSelectedWallet() {
    this.selectedWallet.set(null);
    this.onTouched();
  }

  getValidStatus() {
    return this.form.submitted && !this.control!.valid;
  }
}
