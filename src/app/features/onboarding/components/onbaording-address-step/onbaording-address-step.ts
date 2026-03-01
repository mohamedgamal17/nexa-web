import { Component, computed, input, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormRecord, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { AppFormErrors } from '../../../../shared/components/app-form-errors/app-form-errors';
import { AddressValidators } from '../../../../shared/validators/address-validators.validator';
import { COUNTRIES } from '../../../../core/constants/countries.data';
import { getStatesByCountry } from '../../../../core/constants/states.data';
import { TranslateModule } from '@ngx-translate/core';
import { InputMaskDirective } from "primeng/inputmask";
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-onbaording-address-step',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, SelectModule, AppFormErrors, TranslateModule, ButtonModule],
  templateUrl: './onbaording-address-step.html',
  styleUrl: './onbaording-address-step.scss',
})
export class OnbaordingAddressStep implements OnInit {


  loading= input(false)

  selectedCountry = signal<string | null>(null)

  selectedState = signal<string | null>(null)

  filteredCountries = COUNTRIES.filter(x => x.code == "US")

  filteredStates = computed(() => {
    if (this.selectedCountry()) {
      return getStatesByCountry(this.selectedCountry()!)
    }
    return []
  })

  

  addressForm: FormGroup

  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.addressForm = this.fb.group({
      country: ['', [Validators.required, Validators.maxLength(2)]],
      state: ['', [Validators.required, Validators.maxLength(2)]],
      city: ['', [Validators.required, Validators.maxLength(50),
      AddressValidators.cityName(),
      AddressValidators.noWhitespaceOnly(),]],
      streetLine: ['', [Validators.required, Validators.maxLength(256)]],
      postalCode: ['', [Validators.required, Validators.maxLength(10), AddressValidators.postalCode(),]],
      zipCode: ['', [Validators.required, Validators.maxLength(10), AddressValidators.zipCode()]]
    })
  }


  handleCountryChange(value : any){
    console.log(value)
    this.selectedCountry.set(value)
  }

  handleSubmit($event : SubmitEvent){
    $event.preventDefault()
    this.addressForm.markAllAsTouched()
    if(this.addressForm.valid){

    }
  }
}
