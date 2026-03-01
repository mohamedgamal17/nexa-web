import { Entity } from "../../../core/models/entity.interface"
import { Address } from "./address.interface"
import { CustomerInfo } from "./customer-info.interface"

export interface Customer extends Entity {

  userId: string
  kycCustomerId: string
  fintechCustomerId: string
  phoneNumber: string
  emailAddress: string
  info: CustomerInfo
  address: Address
  document: Document
  status: number
}



