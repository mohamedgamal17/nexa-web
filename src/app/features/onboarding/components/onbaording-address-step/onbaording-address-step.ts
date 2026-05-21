import { Component, computed, effect, Input, input, OnInit, output, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormRecord, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { InputError } from '../../../../shared/components/input-error/Input-error';
import { AddressValidators } from '../../../../shared/validators/address-validators.validator';
import { COUNTRIES } from '../../../../core/constants/countries.data';
import { getStatesByCountry } from '../../../../core/constants/states.data';
import { TranslateModule } from '@ngx-translate/core';
import { InputMaskDirective } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { Address } from '../../../customers/interfaces/address.interface';
import { OnboadringAddressStepTestIds } from './onboarding-address-step.test-ids';

@Component({
  selector: 'app-onbaording-address-step',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, SelectModule, InputError, TranslateModule, ButtonModule],
  templateUrl: './onbaording-address-step.html',
  styleUrl: './onbaording-address-step.scss',
})
export class OnbaordingAddressStep implements OnInit {
  address = input<Address>();

  @Input() address1 :Address
  loading = input(false);

  submited = output<{ address: Address }>();

  stepBack = output<void>();

  selectedCountry = signal<string | null>(null);

  selectedState = signal<string | null>(null);

  tids = OnboadringAddressStepTestIds

  filteredCountries = COUNTRIES.filter((x) => x.code == 'US');

  filteredStates = computed(() => {
    if (this.selectedCountry()) {
      return getStatesByCountry(this.selectedCountry()!);
    }
    return [];
  });

  addressForm: FormGroup;

  constructor(private fb: FormBuilder) {
    effect(() => {
      if (this.address()) {
        this.selectedCountry.set(this.address()!.country);
      }
    });
  }

  ngOnInit(): void {
    this.addressForm = this.fb.group({
      country: [this.address()?.country, [Validators.required, Validators.maxLength(2)]],
      state: [this.address()?.state, [Validators.required, Validators.maxLength(2)]],
      city: [this.address()?.city, [Validators.required, Validators.maxLength(50), AddressValidators.cityName(), AddressValidators.noWhitespaceOnly()]],
      streetLine: [this.address()?.streetLine, [Validators.required, Validators.maxLength(256)]],
      postalCode: [this.address()?.postalCode, [Validators.required, Validators.maxLength(10), AddressValidators.postalCode()]],
      zipCode: [this.address()?.zipCode, [Validators.required, Validators.maxLength(10), AddressValidators.zipCode()]],
    });
  }

  handleCountryChange(value: any) {
    this.selectedCountry.set(value);
  }

  handleSubmit($event: SubmitEvent) {
    $event.preventDefault();
    this.addressForm.markAllAsTouched();
    if (this.addressForm.valid) {
      this.submited.emit({ address: this.addressForm.value });
    }
  }

  handleStepBack() {
    this.stepBack.emit();
  }
}
