import { PagingRequest } from '../../../core/models/paging-request.interface';

export interface WalletRequest extends PagingRequest {
  number?: string;
}

export interface WalletListRequest extends WalletRequest {
  excludeOwned?: boolean;
}
