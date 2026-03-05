import { ErrorModel } from './error-model.interface';
import { PagingInfoResponse } from './paging-response.interface';

export interface PagingState extends PagingInfoResponse {
  isLoading: boolean;
  error: ErrorModel | null;
}
