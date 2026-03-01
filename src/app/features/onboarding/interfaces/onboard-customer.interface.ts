import { Entity } from "../../../core/models/entity.interface"
import { Address } from "../../customers/interfaces/address.interface"
import { CustomerInfo } from "../../customers/interfaces/customer-info.interface"
import { OnboardCustomerStatus } from "../enums/onboard-customer-status.enum"

export interface OnboardCustomer extends Entity {
  userId: string
  phoneNumber: string
  emailAddress: string
  info: CustomerInfo
  address: Address
  emailAddressProvided: boolean,
  phoneNumberProvided: boolean,
  customerInfoProvided: boolean,
  addressProvided: boolean,
  status: OnboardCustomerStatus
}