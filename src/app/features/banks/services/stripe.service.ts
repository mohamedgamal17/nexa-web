import { Injectable } from '@angular/core';
import { loadStripe, SetupIntent, Stripe } from '@stripe/stripe-js';
import { environemnt } from '../../../../environments/environemnt';
import { from, map, mergeMap, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  private stripe: Stripe;

  constructor() {
    (async () => {
      this.initializeStripe();
    })();
  }
  collectBankAccount(token: string): Observable<SetupIntent> {
    return new Observable<SetupIntent>(observer => {
      this.stripe
        .collectBankAccountForSetup({
          clientSecret: token,
          params: {
            payment_method_type: 'us_bank_account',
            payment_method_data: {
              billing_details: {
                name: environemnt.stripe.billingDetails.name,
                email: environemnt.stripe.billingDetails.email,
              },
            },
          },
        })
        .then(() => this.stripe.confirmUsBankAccountSetup(token))
        .then(result => {
          if (result.error) {
            observer.error(result.error);
          } else {
            observer.next(result.setupIntent);
            observer.complete();
          }
        })
        .catch(err => observer.error(err));
    });
  }

  private async initializeStripe() {
    this.stripe = (await loadStripe(environemnt.stripe.publicKey))!; // your publishable key
  }
}
