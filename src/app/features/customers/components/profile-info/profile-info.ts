import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroUserCircle } from '@ng-icons/heroicons/outline';
import { Button } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskDirective } from 'primeng/inputmask';
import { CommonModule } from '@angular/common';
import { featherCalendar } from '@ng-icons/feather-icons';

@Component({
  selector: 'app-profile-info',
  imports: [CardModule, FormsModule, Button, NgIcon, InputTextModule, InputMaskDirective, CommonModule],
  templateUrl: './profile-info.html',
  styleUrl: './profile-info.scss',
  viewProviders: [provideIcons({ heroUserCircle, featherCalendar })],
})
export class ProfileInfo {
  dummy = signal({
    firstName: 'john.doe@example.com',
    lastName: '+1 555 123 4567',
    birthDate: '2001-03-02',
    gender: 'male',
  });

  editProfile = signal(false);

  editPhone = signal(false);

  toggleEditProfile() {
    this.editProfile.set(!this.editProfile());
  }

  toggleEditPhone() {
    this.editPhone.set(!this.editPhone());
  }
}
