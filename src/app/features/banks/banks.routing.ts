import { Routes } from '@angular/router';
import { authGuardFn } from '@auth0/auth0-angular';
import { customerGuardFn } from '../customers/guards/customer-guard';
import { PublicLayout } from '../../layouts/public-layout/public-layout';
import { IndexPage } from './pages/index-page/index-page';

export const banksRoutes: Routes = [
  {
    path: 'banks',
    canActivate: [authGuardFn, customerGuardFn],
    component: PublicLayout,
    children: [
      {path :'' , component : IndexPage}
    ]
  },
];
