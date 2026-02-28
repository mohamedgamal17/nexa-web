import { Component, computed, effect, forwardRef, input, OnInit, output, signal, ViewChild, ViewEncapsulation } from '@angular/core';

import { SelectModule } from 'primeng/select';
import { InputMask, InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { Country } from '../../../core/models/country.interface';
import { COUNTRIES } from '../../../core/constants/countries.data';
import { ControlValueAccessor, FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule, ValidationErrors, Validator } from '@angular/forms';
import { PhoneValueModel } from './models/phone-value-model.interface';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-phone-input',
  imports: [SelectModule,
    InputMaskModule,
    InputTextModule,
    FormsModule,
    ProgressSpinnerModule,
    SkeletonModule,
    ReactiveFormsModule],

  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneInput),
      multi: true,
    }
  ],
  templateUrl: './phone-input.html',
  styleUrl: './phone-input.scss',
})
export class PhoneInput implements OnInit, ControlValueAccessor, Validator {

  @ViewChild(InputMask) inputMaskRef!: InputMask;

  defaultCountry = input<string>('US');
  placeholder = input<string>('Enter phone number');
  label = input<string>('Phone Number');
  showDialCode = input<boolean>(true);
  useMask = input<boolean>(true);
  disabled = input<boolean>(false);
  readonly = input<boolean>(false);
  invalid = input<boolean>(false);
  countries = input<Country[]>(COUNTRIES);
  loading = input<boolean>(false);
  loadingText = input<string>('Loading...');

  selectedCountry = signal<Country | null>(null);
  phoneNumber = signal<string>('');
  isDisabled = signal<boolean>(false);
  isTouched = signal<boolean>(false);

  isInteractionBlocked = computed(() => {
    return this.isDisabled() || this.loading();
  });

  currentMask = computed(() => {
    console.log(this.selectedCountry())
    return this.selectedCountry()?.mask ?? '999 999 999 9999';
  });

  currentPlaceholder = computed(() => {
    const country = this.selectedCountry();
    if (country?.mask) {
      return country.mask.replace(/9/g, '_');
    }

    console.log(this.selectedCountry())
    return this.placeholder();
  });

  filteredCountries = computed(() => {
    return this.countries().sort((a, b) => a.name.localeCompare(b.name));
  });

  formattedValue = computed<PhoneValueModel | null>(() => {
    const country = this.selectedCountry();
    const number = this.phoneNumber();
    if (!country) return null;

    const digits = number.replace(/\D/g, '');
    return {
      countryCode: country.code,
      dialCode: country.dialCode,
      number: digits,
      international: `${country.dialCode}${digits}`,
    };
  });


  private onChange: (value: PhoneValueModel | null) => void = () => { };
  private onTouched: () => void = () => { };
  private onValidatorChange: () => void = () => { };

  constructor() {
    effect(() => {
      this.isDisabled.set(this.disabled());
    });

    effect(() => {
      var value = this.defaultCountry();

      if (value) {
        const defaultC = this.countries().find(c => c.code == this.defaultCountry());
        if (defaultC) this.selectedCountry.set(defaultC);
      }
    })
  }

  ngOnInit(): void {

  }


  writeValue(value: PhoneValueModel | null): void {
    if (value) {
      const country = this.countries().find(c => c.code === value.countryCode);
      this.selectedCountry.set(country ?? null);
      this.phoneNumber.set(value.number ?? '');
    } else {
      const defaultC = this.countries().find(c => c.code === this.defaultCountry());
      this.selectedCountry.set(defaultC ?? null);

    }
  }

  registerOnChange(fn: (value: PhoneValueModel | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }


  validate(): ValidationErrors | null {
    const value = this.formattedValue();
    if (value && value.number) {
      if (value.number.length < 6) {
        return { phoneTooShort: { min: 6, actual: value.number.length } };
      }
      if (value.number.length > 15) {
        return { phoneTooLong: { max: 15, actual: value.number.length } };
      }
    }
    return null;
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onValidatorChange = fn;
  }



  onCountryChange(country: Country): void {


    if (country) {
      this.selectedCountry.set(country);
      if (this.isTouched()) {
        this.emitValue();
        this.onValidatorChange();
      }

    }

  }

  onPhoneInput(value: string): void {
    this.phoneNumber.set(value ?? '');
    this.emitValue();
    this.onValidatorChange();
  }

  onCountrySelectBlur() {
    if (!this.isTouched()) {

      this.isTouched.set(true);
      this.onTouched();
    }
  }

  onBlur(): void {
    if (!this.isTouched()) {
      this.isTouched.set(true);
      this.onTouched();
    }
  }


  private emitValue(): void {
    this.onChange(this.formattedValue());
  }

}
