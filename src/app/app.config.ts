import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { appThemePreset } from './ng-prime.theme';
import { provideAuthFeature } from './features/auth/auth.feature';
import { authHttpInterceptorFn, provideAuth0 } from '@auth0/auth0-angular';
import { environemnt } from '../environments/environemnt';
import { provideOnboardingFeature } from './features/onboarding/onboarding.feature';
import { provideTranslateService } from '@ngx-translate/core';
import {
  provideTranslateHttpLoader,
  TranslateHttpLoader,
} from '@ngx-translate/http-loader';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { errorHandlerInterceptorFn } from './core/interceptors/error-handler.interceptor';
import { provideCustomers as provideCustomersFeature } from './features/customers/customers.feature';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import {
  CUSTOMER_KEY_FEAUTRE,
  customerReducer,
} from './features/customers/state/customer.reducer';
import { CustomerEffect } from './features/customers/state/customer.effect';
import { provideLanding } from './features/landing/landing.feature';
import {
  WALLET_CARD_FEATURE_KEY,
  WALLET_FEATURE_KEY,
  walletCardReducer,
  walletReducer,
} from './features/wallets/state/wallet.reducer';
import { WalletEffects } from './features/wallets/state/wallet.effects';
import { provideTransfers } from './features/transfers/transfer.feature';
import { provideBanks } from './features/banks/banks.features';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(
      withInterceptors([errorHandlerInterceptorFn, authHttpInterceptorFn]),
    ),
    provideAuth0({
      domain: environemnt.auth0.domain,
      clientId: environemnt.auth0.clientId,
      authorizationParams: {
        redirect_uri: window.location.origin + '/',
        audience: environemnt.auth0.audience,
      },
      httpInterceptor: {
        allowedList: [
          {
            uri: `${environemnt.apiUrl}/*`,
            tokenOptions: {
              authorizationParams: {
                audience: environemnt.auth0.audience,
              },
            },
          },
        ],
      },
    }),
    providePrimeNG({
      theme: {
        preset: appThemePreset,
      },
    }),
    provideHttpClient(),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: '/assets/i18n/',
        suffix: '.json',
      }),
      fallbackLang: 'en',
      lang: 'en',
    }),
    provideAuthFeature(),
    provideOnboardingFeature(),
    provideCustomersFeature(),
    provideTransfers(),
    provideLanding(),
    provideBanks(),
    provideStore({
      [CUSTOMER_KEY_FEAUTRE]: customerReducer,
      [WALLET_FEATURE_KEY]: walletReducer,
      [WALLET_CARD_FEATURE_KEY]: walletCardReducer,
    }),
    provideEffects([CustomerEffect, WalletEffects]),
    provideRouter(routes)
  ],
};
