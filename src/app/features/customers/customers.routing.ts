import { Routes } from '@angular/router';
import { authGuardFn } from '@auth0/auth0-angular';
import { PublicLayout } from '../../layouts/public-layout/public-layout';
import { customerGuardFn } from './guards/customer-guard';

export const customerRoutes: Routes = [
  {
    path: 'customer',
    canActivate: [authGuardFn, customerGuardFn],
    component: PublicLayout,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/profile-page/profile-page').then(m => m.ProfilePage),
      },
    ],
  },
];
