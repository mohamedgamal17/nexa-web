import { inject, Injectable } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { customerActions } from './customer.actions';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { ErrorModel } from '../../../core/models/error-model.interface';

@Injectable({
  providedIn: 'root',
})
export class CustomerEffect {
  private customerService = inject(CustomerService);
  private actions = inject(Actions);
  private authService = inject(AuthService);

  bootStrapAfterAuthentication = createEffect(() => {
    return this.authService.isAuthenticated$.pipe(
      switchMap((isAuthenticated) => {
        return isAuthenticated ? of(customerActions.loadCustomer()) : of(customerActions.resetState());
      }),
    );
  });

  loadCustomer = createEffect(() => {
    return this.actions.pipe(
      ofType(customerActions.loadCustomer),
      mergeMap((_) =>
        this.customerService.getCustomer().pipe(
          map((customer) => customerActions.loadCustomerSucceeded({ customer })),
          catchError((error: ErrorModel) => {
            if (error.type === 'not-found') {
              return of(customerActions.loadCustomerSucceeded({ customer: null }));
            }
            return of(customerActions.loadCustomerFailure({ error }));
          }),
        ),
      ),
    );
  });
}
