import { Routes } from '@angular/router';
import { OnboardingPage } from './pages/onboarding-page/onboarding-page';
import { AuthGuard, authGuardFn } from '@auth0/auth0-angular';
import { AuthLayout } from '../../layouts/auth-layout/auth-layout';

export const onboardingRoutes: Routes = [
  {
    path: 'onboarding',
    component: AuthLayout,
    canActivate: [authGuardFn],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../onboarding/pages/onboarding-page/onboarding-page').then(
            m => m.OnboardingPage,
          ),
      },
    ],
  },
];
