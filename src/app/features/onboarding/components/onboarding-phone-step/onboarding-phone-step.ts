import { Component, input, OnInit, output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { InputError } from '../../../../shared/components/input-error/Input-error';
import { ButtonModule } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';
import { PhoneInput } from '../../../../shared/components/phone-input/phone-input';
import { PhoneNumberValidators } from '../../../../shared/components/phone-input/validators/phone-input.validator';
import { PhoneValueModel } from '../../../../shared/components/phone-input/models/phone-value-model.interface';
import { COUNTRIES } from '../../../../core/constants/countries.data';
import { parsePhoneNumber } from '../../../../shared/utils/phone-number.utils';

@Component({
  selector: 'app-onboarding-phone-step',
  imports: [NgxIntlTelInputModule, ReactiveFormsModule, InputError, ButtonModule, TranslateModule, PhoneInput],
  templateUrl: './onboarding-phone-step.html',
  styleUrl: './onboarding-phone-step.scss',
})
export class OnboardingPhoneStep implements OnInit {
  phone = input<string>('');

  loading = input<boolean>(false);

  userPhoneNumber = signal<PhoneValueModel | null>(null);

  formSubmited = signal(false);

  filterdCountries = COUNTRIES.filter((x) => x.code == 'US');

  phoneForm: FormGroup;

  submited = output<{ phone: PhoneValueModel }>();
  stepBack = output<void>();

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    console.log(this.phone());
    const phoneModal = parsePhoneNumber(this.phone());

    console.log(phoneModal);
    this.phoneForm = this.fb.group({
      phone: [phoneModal, [Validators.required, PhoneNumberValidators.phoneRequired(), PhoneNumberValidators.phoneMinLength(6), PhoneNumberValidators.phoneMaxLength(20), PhoneNumberValidators.phoneValid()]],
    });
  }

  handleSubmit($event: SubmitEvent) {
    this.formSubmited.set(true);
    $event.preventDefault();
    this.phoneForm.markAllAsTouched();
    if (this.phoneForm.valid) {
      this.submited.emit(this.phoneForm.value);
    }
  }

  handleStepBack() {
    console.log('back');
    this.stepBack.emit();
  }
}
