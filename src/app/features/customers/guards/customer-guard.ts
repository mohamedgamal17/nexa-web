import { inject } from '@angular/core';
import { CanActivateChild, CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { CustomerService } from '../services/customer.service';
import { AuthService } from '@auth0/auth0-angular';
import { catchError, filter, map, mergeMap, of, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCustomer, selectIsCustomerLoaded } from '../state/customer.selectors';
import { customerActions } from '../state/customer.actions';

export const customerGuardFn: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const store = inject(Store)
  const router = inject(Router);

  return authService.isAuthenticated$.pipe(
    filter(x => x),
    mergeMap(()=> store.select(selectIsCustomerLoaded)),
    filter(x=> x),
    mergeMap(()=> {
      return store.select(selectCustomer)
    }),
    map((customer)=> {
      if(customer){
        return true
      }

      return router.createUrlTree(['/onboarding'])
    }),
  );
};

