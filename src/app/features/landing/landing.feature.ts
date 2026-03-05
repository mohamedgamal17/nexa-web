import { provideRouter } from '@angular/router';
import { landingRoutes } from './landing.routing';

export const provideLanding = () => [provideRouter(landingRoutes)];
