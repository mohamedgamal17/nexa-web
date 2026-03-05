import { createFeatureSelector, createSelector } from "@ngrx/store";
import { WALLET_FEATURE_KEY, WalletState } from "./wallet.reducer";

export const walletState = createFeatureSelector<WalletState>(WALLET_FEATURE_KEY)

export const selectIsWalletStateLoaded = createSelector(
  walletState,
  (state)=> state.loaded
)

export const selectIsWalletsLoading = createSelector(
  walletState,
  (state)=>state.isLoading 
)

export const selectActiveWallet = createSelector(
  walletState,
  (state)=> state.activeWallet
)

export const selectWalletList = createSelector(
  walletState,
  (state)=> state.wallets
)

export const selectWalletPaging = createSelector(
  walletState,
  (state)=> state.paging
)