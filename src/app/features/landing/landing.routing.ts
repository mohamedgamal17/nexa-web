import { Routes } from '@angular/router';
import { authGuardFn } from '@auth0/auth0-angular';
import { PublicLayout } from '../../layouts/public-layout/public-layout';
import { customerGuardFn } from '../customers/guards/customer-guard';

export const landingRoutes: Routes = [
  {
    path: '',
    component: PublicLayout,
    canActivate: [authGuardFn , customerGuardFn],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/dashboard-page/dashboard-page').then(
            m => m.DashboardPage,
          ),
      },
    ],
  },
];
