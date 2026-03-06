import { Entity } from '../../../core/models/entity.interface';

export interface Bank extends Entity {
  userId: string;
  customerId: string;
  providerBankAccountId: string;
  holderName: string;
  bankName: string;
  country: string;
  currency: string;
  accountNumberLast4: string;
  routingNumber: string;
}
