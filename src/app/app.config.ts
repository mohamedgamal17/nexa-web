import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { appThemePreset } from './ng-prime.theme';
import { provideAuthFeature } from './features/auth/auth.feature';
import { provideAuth0 } from '@auth0/auth0-angular';
import { environemnt } from '../environments/environemnt';
import { provideOnboardingFeature } from './features/onboarding/onboarding.feature';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader, TranslateHttpLoader } from '@ngx-translate/http-loader';
import {  provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideAuth0({
      domain: environemnt.auth0.domain,
      clientId: environemnt.auth0.clientId,
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: environemnt.auth0.audience
      },
      httpInterceptor: {
        allowedList: [
          {
            uri: `${environemnt.apiUrl}/*`,
            tokenOptions: {
              authorizationParams: {
                audience: environemnt.auth0.audience
              }
            }
          }
        ]
      }

    }),
    providePrimeNG({
      theme: {
        preset: appThemePreset
      }
    }),
    provideHttpClient(),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: '/assets/i18n/',
        suffix: '.json'
      }),
      fallbackLang: 'en',
      lang: 'en'
    }),
    
    provideAuthFeature(),
    provideOnboardingFeature()
  ]
};
