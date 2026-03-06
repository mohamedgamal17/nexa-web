import { Entity } from '../../../core/models/entity.interface';
import { Customer } from '../../customers/interfaces/customer.interface';
import { PublicCustomer } from '../../customers/interfaces/public-customer.interface';

export interface Wallet extends Entity {
  providerWalletId?: string;
  customerId: string;
  customer?: PublicCustomer;
  userId: string;
  number: string;
  balance: number;
}
