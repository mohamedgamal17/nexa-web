import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Customer } from '../interfaces/customer.interface';

export const customerActions = createActionGroup({
  source: '[Customer]',
  events: {
    'Reset state': emptyProps(),
    'Load Customer': emptyProps(),
    'Load Customer Succeeded': props<{ customer: Customer | null }>(),
    'Load Customer Failure': props<{ error: any }>(),
    'Update Customer': props<{ customer: Customer }>(),
  },
});
