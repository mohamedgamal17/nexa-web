import { createReducer, on } from '@ngrx/store';
import { Wallet } from '../interfaces/wallet.interface';
import { walletActions } from './wallet.actions';
import { PagingState } from '../../../core/models/paging-state.interface';

export interface WalletState {
  loaded: boolean;
  activeWallet: Wallet | null;
  wallets: Wallet[];
  paging: PagingState;
  isLoading: boolean;
}

export const WALLET_FEATURE_KEY = 'wallets';

const initialState: WalletState = {
  loaded: false,
  activeWallet: null,
  wallets: [],
  isLoading: false,
  paging: {
    skip: 0,
    length: 0,
    totalCount: 0,
    isLoading: false,
    error: null,
  },
};

export const walletReducer = createReducer(
  initialState,

  on(walletActions.setActiveWallet, (state, { wallet }) => ({
    ...state,
    activeWallet: state.activeWallet?.id != wallet.id ? wallet : state.activeWallet,
  })),

  on(walletActions.loadWallets, (state, { paging }) => ({
    ...state,
    isLoading: paging.skip === 0 ? true : state.isLoading,
    paging: {
      ...state.paging,
      skip: paging.skip,
      length: paging.length,
      isLoading: paging.skip > 0 ? true : state.paging.isLoading,
    },
  })),

  on(walletActions.loadWalletsSuccess, (state, { wallets, paging }) => ({
    ...state,
    loaded: state.loaded === false ? true : state.loaded,
    wallets: wallets,
    activeWallet: state.activeWallet ?? wallets[0],
    paging: {
      ...state.paging,
      ...paging,
      isLoading: paging.skip > 0 ? false : state.paging.isLoading,
    },
    isLoading: paging.skip === 0 ? false : state.isLoading,
  })),

  on(walletActions.loadWalletsFailure, (state, { error }) => ({
    ...state,
    loaded: state.loaded === false ? true : state.loaded,
    isLoading: state.paging.skip === 0 ? false : state.isLoading,
    error: state.paging.skip === 0 ? error : null,
    paging: {
      ...state.paging,
      isLoading: state.paging.skip > 0 ? false : state.paging.isLoading,
      error: state.paging.skip > 0 ? error : null,
    },
  })),
);
