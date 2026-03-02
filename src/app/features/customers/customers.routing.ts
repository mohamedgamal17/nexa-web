import { Routes } from '@angular/router';
import { authGuardFn } from '@auth0/auth0-angular';

export const customerRoutes: Routes = [
  {
    path: 'customer',
    canActivate: [authGuardFn],
    loadComponent: () => import('../../layouts/public-layout/public-layout').then((m) => m.PublicLayout),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/profile-page/profile-page').then((m) => m.ProfilePage),
      },
    ],
  },
];
