import { PagingInfoResponse } from './paging-response.interface';

export interface PagingState extends PagingInfoResponse {
  isLoading: boolean;
  error?: any;
}
