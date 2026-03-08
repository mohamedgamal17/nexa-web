import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { AuthLayout } from '../../layouts/auth-layout/auth-layout';

export const authRoutes: Routes = [
  {
    path: 'auth',
    component: AuthLayout,
    children: [{ path: '', component: LoginPage }],
  },
];
