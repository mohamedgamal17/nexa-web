import { Entity } from '../../../core/models/entity.interface';

export interface Wallet extends Entity {
  providerWalletId?: string;
  customerId: string;
  userId: string;
  number: string;
  balance: number;
}
