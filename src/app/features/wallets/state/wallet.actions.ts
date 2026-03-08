import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Wallet } from '../interfaces/wallet.interface';
import { PagingRequest } from '../../../core/models/paging-request.interface';
import { PagingInfoResponse } from '../../../core/models/paging-response.interface';
import { ErrorModel } from '../../../core/models/error-model.interface';

export const walletActions = createActionGroup({
  source: '[Wallet]',
  events: {
    'set Active Wallet': props<{ wallet: Wallet }>(),
    'Load Wallets': props<{ paging: PagingRequest }>(),
    'Load Wallets Success': props<{
      wallets: Wallet[];
      paging: PagingInfoResponse;
    }>(),
    'Load Wallets Failure': props<{ error: ErrorModel }>(),
  },
});

export const walletCardActions = createActionGroup({
  source: '[Wallet Card]',
  events: {
    'Toggle P2P Transfer Modal': emptyProps(),
    'Toggle Bank Transfer Modal': props<{
      modalType?: 'deposit' | 'withdraw';
    }>(),
  },
});
