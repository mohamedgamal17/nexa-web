import { Component, computed, signal } from '@angular/core';
import { COUNTRIES } from '../../../../core/constants/countries.data';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherMapPin } from '@ng-icons/feather-icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { getStatesByCountry } from '../../../../core/constants/states.data';

@Component({
  selector: 'app-profile-address',
  imports: [CardModule, ButtonModule, SelectModule, InputTextModule, NgIcon, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './profile-address.html',
  styleUrl: './profile-address.scss',
  viewProviders: [provideIcons({ featherMapPin })],
})
export class ProfileAddress {
  countries = COUNTRIES.filter((x) => x.code === 'US');

  states = computed(() => getStatesByCountry(this.dummy().country));
  currentCountry = computed(() => this.countries.find((x) => x.code === this.dummy().country));
  currentState = computed(() => this.states().find((x) => x.code == this.dummy().state));

  dummy = signal({
    country: 'US',
    state: 'CA',
    city: 'Arizona',
    streetLine: '21 CA Arizona',
    postalCode: '54154',
    zipCode: '6514',
  });

  editAddress = signal(false);

  toggleEditAddress() {
    this.editAddress.set(!this.editAddress());
  }
}
