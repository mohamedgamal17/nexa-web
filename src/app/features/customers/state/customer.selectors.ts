import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CUSTOMER_KEY_FEAUTRE, CustomerState } from "./customer.reducer";

export const selectCustomerState = createFeatureSelector<CustomerState>(CUSTOMER_KEY_FEAUTRE)

export const selectIsCustomerLoading = createSelector(selectCustomerState,
  x=> x.isLoading
)

export const selectIsCustomerLoaded = createSelector(
  selectCustomerState,
  x=> x.loaded
)

export const selectCustomer= createSelector(
  selectCustomerState,
  x=> x.customer
)

export const selectCustomerError = createSelector(
  selectCustomerState,
  x=> x.error
)