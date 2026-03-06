import { Entity } from '../../../core/models/entity.interface';
import { CustomerInfo } from './customer-info.interface';

export interface PublicCustomer extends Entity {
  userId: string;
  info: CustomerInfo;
}
