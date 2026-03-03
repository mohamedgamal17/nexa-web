import { Component, input, OnInit, output, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomValidator } from '../../../../shared/validators/cutom-validators.validator';
import { Gender } from '../../../customers/enums/gender.enum';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TranslateModule } from '@ngx-translate/core';
import { InputError } from '../../../../shared/components/input-error/Input-error';
import { SelectModule } from 'primeng/select';
import { InputMaskModule } from 'primeng/inputmask';
import { DatePickerModule } from 'primeng/datepicker';
import { CustomerInfo } from '../../../customers/interfaces/customer-info.interface';
@Component({
  selector: 'app-onboarding-profile-step',
  imports: [ReactiveFormsModule, FormsModule, ButtonModule, InputTextModule, TranslateModule, InputError, SelectModule, InputMaskModule, DatePickerModule],
  templateUrl: './onboarding-profile-step.html',
  styleUrl: './onboarding-profile-step.scss',
})
export class OnboardingProfileStep implements OnInit {
  info = input<CustomerInfo | null>(null);

  loading = input(false);

  stepBack = output<void>();

  formSubmited = signal(false);

  profileFormGroup: FormGroup;

  submited = output<{ info: CustomerInfo }>();
  genderSelect: { label: string; value: number }[] = [
    { label: 'Male', value: Gender.Male },
    { label: 'Female', value: Gender.Female },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    console.log(this.info());
    this.profileFormGroup = this.fb.group({
      firstName: [this.info()?.firstName, [Validators.required, Validators.max(256), Validators.min(2)]],
      lastName: [this.info()?.lastName, [Validators.required, Validators.max(256), Validators.min(2)]],
      birthDate: [this.info()?.birthDate, [Validators.required, CustomValidator.verifyDate(), CustomValidator.verifyAge(), CustomValidator.minAge(18)]],
      gender: [this.info()?.gender ?? Gender.Male, [Validators.required, CustomValidator.enumValidator(Gender)]],
    });
  }

  handleSubmit($event: SubmitEvent) {
    $event.preventDefault();
    this.formSubmited.set(true);
    this.profileFormGroup.markAllAsTouched();
    if (this.profileFormGroup.valid) {
      this.submited.emit({ info: this.profileFormGroup.value });
    }
  }

  handleStepBack() {
    this.stepBack.emit();
  }
}
