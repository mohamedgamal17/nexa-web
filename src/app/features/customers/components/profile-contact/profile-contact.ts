import { Component, effect, inject, input, OnInit, output, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { Button } from 'primeng/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherMail } from '@ng-icons/feather-icons';
import { heroPhone } from '@ng-icons/heroicons/outline';
import { InputTextModule } from 'primeng/inputtext';
import { parsePhoneNumber } from '../../../../shared/utils/phone-number.utils';
import { PhoneNumberValidators } from '../../../../shared/components/phone-input/validators/phone-input.validator';
import { FormError } from '../../../../shared/components/form-error/form-error';
import { InputError } from '../../../../shared/components/input-error/Input-error';
import { TranslateModule } from '@ngx-translate/core';
import { PhoneInput } from '../../../../shared/components/phone-input/phone-input';
import { PhoneValueModel } from '../../../../shared/components/phone-input/models/phone-value-model.interface';

@Component({
  selector: 'app-profile-contact',
  imports: [CardModule, FormsModule, Button, NgIcon, InputTextModule, ReactiveFormsModule, InputError, TranslateModule, PhoneInput],
  templateUrl: './profile-contact.html',
  styleUrl: './profile-contact.scss',
  viewProviders: [provideIcons({ featherMail, heroPhone })],
})
export class ProfileContact implements OnInit {
  contact = input<{ email: string; phoneNumber: string }>();
  emailSubmiting = input(false);
  phoneSubmiting = input(false);
  fb = inject(FormBuilder);

  emailForm: FormGroup;
  phoneForm: FormGroup;

  editEmail = signal(false);
  editPhone = signal(false);

  emailSubmited = output<{ email: string }>();
  phoneSubmited = output<{ phoneNumber: PhoneValueModel }>();

  constructor() {}
  ngOnInit(): void {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.maxLength(256), Validators.email]],
    });

    this.phoneForm = this.fb.group({
      phoneNumber: [, [Validators.required, PhoneNumberValidators.phoneRequired(), PhoneNumberValidators.phoneMinLength(6), PhoneNumberValidators.phoneMaxLength(20), PhoneNumberValidators.phoneValid()]],
    });
    var value = this.contact();

    if (!value) {
      return;
    }

    if (value.email) {
      this.emailForm.patchValue({ email: value.email });
    }

    if (value.phoneNumber) {
      const model = parsePhoneNumber(value.phoneNumber);
      this.phoneForm.patchValue({ phoneNumber: model });
    }
  }

  handleEmailSumbit($event: SubmitEvent) {
    $event.preventDefault();
    if (this.emailForm.valid) {
      if (this.emailForm.value.email == this.contact()?.email) {
        this.toggleEditEmail();
      } else {
        this.emailSubmited.emit(this.emailForm.value);
      }
    }
  }

  handlePhoneSubmit($event: SubmitEvent) {
    $event.preventDefault();
    if (this.phoneForm.valid) {
      if (this.phoneForm.value.phoneNumber?.international === this.contact()?.phoneNumber) {
        this.toggleEditPhone();
      } else {
        this.phoneSubmited.emit(this.phoneForm.value);
      }
    }
  }

  toggleEditEmail() {
    this.editEmail.set(!this.editEmail());
  }

  toggleEditPhone() {
    this.editPhone.set(!this.editPhone());
  }
}
