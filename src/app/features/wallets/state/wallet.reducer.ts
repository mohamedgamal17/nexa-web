import { createReducer, on } from '@ngrx/store';
import { Wallet } from '../interfaces/wallet.interface';
import { walletActions, walletCardActions } from './wallet.actions';
import { PagingState } from '../../../core/models/paging-state.interface';
import { ErrorModel } from '../../../core/models/error-model.interface';

export interface WalletState {
  loaded: boolean;
  activeWallet: Wallet | null;
  wallets: Wallet[];
  paging: PagingState;
  isLoading: boolean;
  error: ErrorModel | null;
}

export interface WalletCardState {
  showP2PModal: boolean;
  showBankModal: boolean;
  showReciveFundsModal:boolean,
  bankModalType: 'deposit' | 'withdraw';
}

export const WALLET_FEATURE_KEY = 'wallets';

export const WALLET_CARD_FEATURE_KEY = 'wallet-card';

const initialState: WalletState = {
  loaded: false,
  activeWallet: null,
  wallets: [],
  isLoading: false,
  error: null,
  paging: {
    skip: 0,
    length: 0,
    totalCount: 0,
    isLoading: false,
    error: null,
  },
};

const walletCardInitialState: WalletCardState = {
  showBankModal: false,
  showP2PModal: false,
  showReciveFundsModal :false,
  bankModalType: 'deposit',
};

export const walletReducer = createReducer(
  initialState,

  on(walletActions.setActiveWallet, (state, { wallet }) => ({
    ...state,
    activeWallet:
      state.activeWallet?.id != wallet.id ? wallet : state.activeWallet,
  })),

  on(walletActions.loadWallets, (state, { paging }) => ({
    ...initialState,
    loaded: true,
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

export const walletCardReducer = createReducer(
  walletCardInitialState,
  on(walletCardActions.toggleP2PTransferModal, state => ({
    ...state,
    showP2PModal: !state.showP2PModal,
  })),

  on(walletCardActions.toggleBankTransferModal, (state, { modalType }) => ({
    ...state,
    showBankModal: !state.showBankModal,
    bankModalType: modalType != null ? modalType : state.bankModalType,
  })),

  on(walletCardActions.toggleReciveFundsModal, (state)=> ({
    ...state,
    showReciveFundsModal :!state.showReciveFundsModal
  }))
);
