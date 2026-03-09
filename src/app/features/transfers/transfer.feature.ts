import { provideRouter } from '@angular/router';
import { transferRoutes } from './transfer.routing';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

export const provideTransfers = () => [provideRouter(transferRoutes)];
