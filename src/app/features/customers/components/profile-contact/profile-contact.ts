import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { Button } from 'primeng/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherMail } from '@ng-icons/feather-icons';
import { heroPhone } from '@ng-icons/heroicons/outline';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-profile-contact',
  imports: [CardModule, FormsModule, Button, NgIcon, InputTextModule],
  templateUrl: './profile-contact.html',
  styleUrl: './profile-contact.scss',
  viewProviders: [provideIcons({ featherMail, heroPhone })],
})
export class ProfileContact {
  dummy = signal({
    email: 'john.doe@example.com',
    phone: '+1 555 123 4567',
  });

  editEmail = signal(false);

  editPhone = signal(false);

  toggleEditEmail() {
    this.editEmail.set(!this.editEmail());
  }

  toggleEditPhone() {
    this.editPhone.set(!this.editPhone());
  }
}
