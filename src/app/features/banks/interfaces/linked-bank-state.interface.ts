import { StripeError } from "@stripe/stripe-js"
import { ErrorModel } from "../../../core/models/error-model.interface"
import { Bank } from "./bank.interface"

export interface LinkedBankState {
    progress : 'Pending' | 'Processing' | 'Completed' | 'Destroyed' | 'Error',
    bank? : Bank | null
    error? : ErrorModel | any
  }