import { Routes } from '@angular/router';
import { authGuardFn } from '@auth0/auth0-angular';

export const landingRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('../../layouts/public-layout/public-layout').then((m) => m.PublicLayout),
    canActivate: [authGuardFn],
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/dashboard-page/dashboard-page').then((m) => m.DashboardPage),
      },
    ],
  },
];
