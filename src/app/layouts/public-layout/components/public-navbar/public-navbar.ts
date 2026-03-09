import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroUser } from '@ng-icons/heroicons/outline';
import { Store } from '@ngrx/store';
import { LucideAngularModule, Wallet as WalletIcon } from 'lucide-angular';
import {
  selectCustomer,
  selectCustomerError,
  selectIsCustomerLoading,
} from '../../../../features/customers/state/customer.selectors';
import { CustomerStatus } from '../../../../features/customers/enums/customer-status.enum';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { SkeletonModule } from 'primeng/skeleton';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-public-navbar',
  imports: [
    NgIcon,
    LucideAngularModule,
    CommonModule,
    ButtonModule,
    RouterModule,
    MenuModule,
    SkeletonModule,
  ],
  templateUrl: './public-navbar.html',
  styleUrl: './public-navbar.scss',
  viewProviders: [provideIcons({ heroUser })],
})
export class PublicNavbar {
  private store = inject(Store);
  private router = inject(Router);
  private authService = inject(AuthService);

  currentCustomer = toSignal(this.store.select(selectCustomer));
  customerLoading = toSignal(this.store.select(selectIsCustomerLoading));

  customerError = toSignal(this.store.select(selectCustomerError));

  WalletIcon = WalletIcon;

  items = [
    {
      label: 'Profile',
      link: '/customer',
      icon: 'pi pi-user',
    },
  ];
  constructor() {}
  getCustomerStatus() {
    if (this.currentCustomer()?.status === CustomerStatus.Verified) {
      return 'verified';
    }

    return 'unverified';
  }

  getCustomerStatusColor() {
    if (this.currentCustomer()?.status === CustomerStatus.Verified) {
      return 'text-success';
    }
    return 'text-danget';
  }

  showLogo() {
    return this.router.url == '' || this.router.url == '/';
  }

  logout() {
    this.authService.logout({logoutParams :{returnTo :window.location.origin + '/auth'}});
  }
}
