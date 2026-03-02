import { Component, computed, signal } from '@angular/core';
import { Card } from 'primeng/card';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { Button } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { featherFileText, featherShield } from '@ng-icons/feather-icons';

@Component({
  selector: 'app-profile-document',
  imports: [Card, NgIcon, Button, MessageModule],
  templateUrl: './profile-document.html',
  styleUrl: './profile-document.scss',
  viewProviders: [provideIcons({ featherShield, featherFileText })],
})
export class ProfileDocument {
  hasDocument = computed(() => this.dummy() != null);
  dummy = signal({
    type: 'Passport',
    issuedCountry: 'United state',
    status: 'Verified',
    attachments: [
      {
        file: 'passport_front.jpg',
        size: '1.95MB',
        format: 'jpg',
      },
    ],
  });
}
