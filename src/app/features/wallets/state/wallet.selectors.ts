import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  WALLET_CARD_FEATURE_KEY,
  WALLET_FEATURE_KEY,
  WalletCardState,
  WalletState,
} from './wallet.reducer';

export const walletState =
  createFeatureSelector<WalletState>(WALLET_FEATURE_KEY);

export const walletCardState = createFeatureSelector<WalletCardState>(
  WALLET_CARD_FEATURE_KEY,
);

export const selectIsWalletStateLoaded = createSelector(
  walletState,
  state => state.loaded,
);

export const selectIsWalletsLoading = createSelector(
  walletState,
  state => state.isLoading,
);

export const selectActiveWallet = createSelector(
  walletState,
  state => state.activeWallet,
);

export const selectWalletList = createSelector(
  walletState,
  state => state.wallets,
);

export const selectWalletPaging = createSelector(
  walletState,
  state => state.paging,
);

export const selectWalletError = createSelector(
  walletState,
  state => state.error,
);

export const selectShowP2PModal = createSelector(
  walletCardState,
  state => state.showP2PModal,
);

export const selectShowBankModal = createSelector(
  walletCardState,
  state => state.showBankModal,
);

export const selectBankModalType = createSelector(
  walletCardState,
  state => state.bankModalType,
);
