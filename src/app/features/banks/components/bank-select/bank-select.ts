import { Component, effect, forwardRef, input, OnInit, signal } from '@angular/core';
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

  constructor() {
    effect(() => {
      const bank = this.selectedBank();
      this.onChange(bank);
      this.onTouch();
    });
  }
  ngOnInit(): void {
    const banks = this.banks();

    if (banks.length > 0) {
      this.selectedBank.set(banks[0]);
    }
  }

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
    console.log(bank);
    this.selectedBank.set(bank);
    console.log(this.selectedBank());
  }
}
