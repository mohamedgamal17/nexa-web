import { Routes } from '@angular/router';
import { authGuardFn } from '@auth0/auth0-angular';
import { PublicLayout } from '../../layouts/public-layout/public-layout';
import { customerGuardFn } from '../customers/guards/customer-guard';

export const transferRoutes: Routes = [
  {
    path: 'transfers',
    canActivate: [authGuardFn, customerGuardFn],
    component: PublicLayout,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/index-page/index-page').then(m => m.IndexPage),
      },
    ],
  },
];
