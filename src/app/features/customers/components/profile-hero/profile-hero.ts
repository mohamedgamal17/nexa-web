import { Component, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherCheckCircle, featherUser } from '@ng-icons/feather-icons';
import { heroCheckCircle } from '@ng-icons/heroicons/outline';
import { CardModule } from 'primeng/card';
import { Customer } from '../../interfaces/customer.interface';
import { CustomerStatus } from '../../enums/customer-status.enum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-hero',
  imports: [CardModule, NgIcon, CommonModule],
  templateUrl: './profile-hero.html',
  styleUrl: './profile-hero.scss',
  viewProviders: [provideIcons({ featherUser, featherCheckCircle, heroCheckCircle })],
})
export class ProfileHero {
  customer = input<Customer>();

  getBadgeStateClass() {
    if (this.customer()?.status == CustomerStatus.Unverified) {
      return 'bg-warning-subtle text-warning';
    }

    return 'bg-primary-subtle text-primary';
  }

  getDotStateClass() {
    if (this.customer()?.status == CustomerStatus.Unverified) {
      return 'bg-warning';
    }

    return 'bg-primary';
  }

  getAccountStatus() {
    if (this.customer()?.status == CustomerStatus.Unverified) {
      return 'Unverified';
    }
    return 'Verified';
  }
}
