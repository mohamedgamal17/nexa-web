import { TransferDirection } from "../enums/transfer-direction.enum"

export interface BankTransfer{
  walletId : string,
  fundingResourceId :string
  amount : number,
  direction : TransferDirection
}