import { provideRouter } from '@angular/router';
import { customerRoutes } from './customers.routing';
import { provideStore } from '@ngrx/store';
import { CUSTOMER_KEY_FEAUTRE, customerReducer } from './state/customer.reducer';
import { provideEffects } from '@ngrx/effects';
import { CustomerEffect } from './state/customer.effect';

export const provideCustomers = () => [provideRouter(customerRoutes)];
