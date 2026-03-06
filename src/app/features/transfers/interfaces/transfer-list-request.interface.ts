import { PagingRequest } from '../../../core/models/paging-request.interface';

export interface TransferListRequest extends PagingRequest {
  walletId?: string;
}
