import { TransferDirection } from "../enums/transfer-direction.enum"
import { TransferType } from "../enums/transfer-type.enum"

export interface TransferModal {
  reciverWalletId? : string
  bankAccountId : string
  type : TransferType
  direction : TransferDirection
  amount : number
}