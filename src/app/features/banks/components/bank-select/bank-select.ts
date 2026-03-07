import {
  Component,
  effect,
  forwardRef,
  input,
  linkedSignal,
  OnInit,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Bank } from '../../interfaces/bank.interface';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroBuildingLibrary, heroCheck } from '@ng-icons/heroicons/outline';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bank-select',
  imports: [NgIcon, CommonModule],
  templateUrl: './bank-select.html',
  styleUrl: './bank-select.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BankSelect),
      multi: true,
    },
  ],
  viewProviders: [provideIcons({ heroBuildingLibrary, heroCheck })],
})
export class BankSelect implements OnInit, ControlValueAccessor {
  banks = input<Bank[]>([]);

  selectedBank = signal<Bank | null>(null);

  isDisabled = signal(false);

  private onChange = (bank: Bank | null) => {};

  private onTouch = () => {};

  constructor() {}
  ngOnInit(): void {}

  writeValue(obj: Bank | null): void {
    this.selectedBank.set(obj);
  }
  registerOnChange(fn: (value: Bank | null) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  updateSelectedBank(bank: Bank) {
    this.selectedBank.set(bank);
    this.onChange(bank);
    this.onTouch();
  }
}
