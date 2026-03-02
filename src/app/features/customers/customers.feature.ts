import { provideRouter } from '@angular/router';
import { customerRoutes } from './customers.routing';

export const provideCustomers = () => [provideRouter(customerRoutes)];
