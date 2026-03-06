import { Entity } from "../../../core/interfaces/entity.interface"
import { BankTransfer } from "../../banks/enums/bank-transfer.enum"
import { Wallet } from "../../wallets/interfaces/wallet.interface"
import { TransferDirection } from "../enums/transfer-direction.enum"
import { TransferStatus } from "../enums/transfer-status.enum"
import { TransferType } from "../enums/transfer-type.enum"

export interface Transfer extends Entity{
  userId: string
  walletId: string
  wallet: Wallet
  number: string
  amount: number
  reciverId? : string
  reciver?: Wallet
  fundingResourceId? : string
  direction : TransferDirection
  bankTransferType? : BankTransfer
  status: TransferStatus
  completedAt: Date
  type: TransferType
}