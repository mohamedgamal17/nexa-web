import {
  Component,
  computed,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { COUNTRIES } from '../../../../core/constants/countries.data';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherMapPin } from '@ng-icons/feather-icons';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { getStatesByCountry } from '../../../../core/constants/states.data';
import { Address } from '../../interfaces/address.interface';
import { AddressValidators } from '../../../../shared/validators/address-validators.validator';
import { TranslateModule } from '@ngx-translate/core';
import { InputError } from '../../../../shared/components/input-error/Input-error';

@Component({
  selector: 'app-profile-address',
  imports: [
    CardModule,
    ButtonModule,
    SelectModule,
    InputTextModule,
    NgIcon,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    TranslateModule,
    InputError,
  ],
  templateUrl: './profile-address.html',
  styleUrl: './profile-address.scss',
  viewProviders: [provideIcons({ featherMapPin })],
})
export class ProfileAddress implements OnInit {
  address = input<Address>();
  isSubmiting = input(false);

  submited = output<{ address: Address }>();

  private fb = inject(FormBuilder);
  addressForm: FormGroup;

  countries = COUNTRIES.filter(x => x.code === 'US');
  states = computed(() => {
    const country = this.currentSelectedCountry();
    if (country) {
      return getStatesByCountry(country);
    }
    return [];
  });

  currentSelectedCountry = signal<string | undefined>(undefined);

  currentCountry = computed(() =>
    this.countries.find(x => x.code == this.address()?.country),
  );

  currentState = computed(() => {
    let address = this.address();
    if (address) {
      const country = address.country;
      const state = address.state;

      return getStatesByCountry(country).find(x => x.code == state);
    }
    return null;
  });

  editAddress = signal(false);

  ngOnInit(): void {
    this.addressForm = this.fb.group({
      country: [
        this.address()?.country,
        [Validators.required, Validators.maxLength(2)],
      ],
      state: [
        this.address()?.state,
        [Validators.required, Validators.maxLength(2)],
      ],
      city: [
        this.address()?.city,
        [
          Validators.required,
          Validators.maxLength(50),
          AddressValidators.cityName(),
          AddressValidators.noWhitespaceOnly(),
        ],
      ],
      streetLine: [
        this.address()?.streetLine,
        [Validators.required, Validators.maxLength(256)],
      ],
      postalCode: [
        this.address()?.postalCode,
        [
          Validators.required,
          Validators.maxLength(10),
          AddressValidators.postalCode(),
        ],
      ],
      zipCode: [
        this.address()?.zipCode,
        [
          Validators.required,
          Validators.maxLength(10),
          AddressValidators.zipCode(),
        ],
      ],
    });

    this.currentSelectedCountry.set(this.address()?.country);
  }

  toggleEditAddress() {
    this.editAddress.set(!this.editAddress());
  }

  handleSubmit($event: SubmitEvent) {
    $event.preventDefault();
    if (this.addressForm.valid) {
      if (
        !this.address() ||
        this.hasAddressChanged(this.addressForm.value, this.address()!)
      ) {
        this.submited.emit({ address: this.addressForm.value });
      }
    }
  }

  handleCountryChange(country: any) {
    this.currentSelectedCountry.set(country);
  }

  hasAddressChanged(left: Address, right: Address) {
    return (
      left.country != right.country ||
      left.state != right.state ||
      left.streetLine != right.streetLine ||
      left.city != right.city ||
      left.postalCode != right.postalCode ||
      left.zipCode != right.zipCode
    );
  }
}
