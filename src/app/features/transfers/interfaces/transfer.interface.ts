import { Entity } from '../../../core/models/entity.interface';
import { Wallet } from '../../wallets/interfaces/wallet.interface';
import { TransferDirection } from '../enums/transfer-direction.enum';
import { TransferStatus } from '../enums/transfer-status.enum';
import { TransferType } from '../enums/transfer-type.enum';
import { BankTransfer } from './bank-transfer-request.interface';

export interface Transfer extends Entity {
  userId: string;
  walletId: string;
  wallet: Wallet;
  number: string;
  amount: number;
  reciverId?: string;
  reciver?: Wallet;
  fundingResourceId?: string;
  direction: TransferDirection;
  bankTransferType?: BankTransfer;
  status: TransferStatus;
  completedAt: Date;
  type: TransferType;
}
