import { createReducer, on } from '@ngrx/store';
import { Customer } from '../interfaces/customer.interface';
import { customerActions } from './customer.actions';
import { ErrorModel } from '../../../core/models/error-model.interface';

export const CUSTOMER_KEY_FEAUTRE = 'customer';

export interface CustomerState {
  loaded: boolean;
  customer: Customer | null;
  isLoading: boolean;
  error: ErrorModel | null;
}

const initalState: CustomerState = {
  customer: null,
  loaded: false,
  isLoading: false,
  error: null,
};

export const customerReducer = createReducer(
  initalState,
  on(customerActions.loadCustomer, (state) => ({
    ...state,
    loaded: false,
    isLoading: true,
    error: null,
  })),

  on(customerActions.resetState, (state) => ({
    ...initalState,
  })),

  on(customerActions.loadCustomerSucceeded, (state, { customer }) => ({
    ...state,
    isLoading: false,
    loaded: true,
    customer: customer,
  })),

  on(customerActions.loadCustomerFailure, (state, { error }) => ({
    ...state,
    loaded: true,
    isLoading: false,
    error: error,
  })),

  on(customerActions.updateCustomer, (state, { customer }) => ({
    ...state,
    customer,
  })),
);
