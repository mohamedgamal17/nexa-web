import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroUserCircle } from '@ng-icons/heroicons/outline';
import { Button } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskDirective, InputMaskModule } from 'primeng/inputmask';
import { CommonModule } from '@angular/common';
import { featherCalendar } from '@ng-icons/feather-icons';
import { CustomerInfo } from '../../interfaces/customer-info.interface';
import { CustomValidator } from '../../../../shared/validators/cutom-validators.validator';
import { Gender } from '../../enums/gender.enum';
import { SelectModule } from 'primeng/select';
import { TranslateModule } from '@ngx-translate/core';
import { InputError } from '../../../../shared/components/input-error/Input-error';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'app-profile-info',
  imports: [CardModule, FormsModule, Button, NgIcon, InputTextModule, SelectModule, CommonModule, ReactiveFormsModule, TranslateModule, InputError, DatePickerModule, InputMaskModule],
  templateUrl: './profile-info.html',
  styleUrl: './profile-info.scss',
  viewProviders: [provideIcons({ heroUserCircle, featherCalendar })],
})
export class ProfileInfo implements OnInit {
  info = input<CustomerInfo>();
  isSubmiting = input<boolean>(false);

  private fb = inject(FormBuilder);
  infoForm: FormGroup;
  genderSelect: { label: string; value: number }[] = [
    { label: 'Male', value: Gender.Male },
    { label: 'Female', value: Gender.Female },
  ];
  editProfile = signal(false);

  submited = output<{ info: CustomerInfo }>();

  ngOnInit(): void {
    this.infoForm = this.fb.group({
      firstName: [this.info()?.firstName, [Validators.required, Validators.max(256), Validators.min(2)]],
      lastName: [this.info()?.lastName, [Validators.required, Validators.max(256), Validators.min(2)]],
      birthDate: [new Date(this.info()?.birthDate ?? ''), [Validators.required, CustomValidator.verifyDate(), CustomValidator.verifyAge(), CustomValidator.minAge(18)]],
      gender: [this.info()?.gender ?? Gender.Male, [Validators.required, CustomValidator.enumValidator(Gender)]],
    });
  }

  toggleEditProfile() {
    this.editProfile.set(!this.editProfile());
  }

  handleSubmit($event: SubmitEvent) {
    $event.preventDefault();
    console.log('S');
    if (this.infoForm.valid) {
      console.log('S1');
      const newState: CustomerInfo = this.infoForm.value;
      const currentState = this.info()!;

      if (this.hasInfoChanged(currentState, newState)) {
        this.submited.emit({ info: newState });
      }
    }
  }

  getGenderLabel(gender: Gender) {
    return this.genderSelect.find((x) => x.value === gender)!.label;
  }

  private hasInfoChanged(current: CustomerInfo, newState: CustomerInfo) {
    return current.firstName != newState.firstName || current.lastName != newState.lastName || this.hasBirthDateChange(current.birthDate, newState.birthDate) || current.gender != newState.gender;
  }

  private hasBirthDateChange(left: string, right: string) {
    var leftDate = new Date(left);
    var rightDate = new Date(right);

    return leftDate.getFullYear() != rightDate.getFullYear() || leftDate.getMonth() != rightDate.getMonth() || rightDate.getDay() != rightDate.getDay();
  }
}
