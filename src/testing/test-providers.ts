import { signal } from '@angular/core';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { CUSTOMER_KEY_FEAUTRE } from '../app/features/customers/state/customer.reducer';
import {
  WALLET_CARD_FEATURE_KEY,
  WALLET_FEATURE_KEY,
} from '../app/features/wallets/state/wallet.reducer';
import { CustomerState } from '../app/features/customers/state/customer.reducer';
import {
  WalletCardState,
  WalletState,
} from '../app/features/wallets/state/wallet.reducer';

export const mockAuthService = {
  isAuthenticated$: of(true),
  user$: of(null),
  loginWithRedirect: vi.fn(() => of(void 0)),
  logout: vi.fn(),
};

export const defaultCustomerState: CustomerState = {
  customer: null,
  loaded: false,
  isLoading: false,
  error: null,
};

export const defaultWalletState: WalletState = {
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

export const defaultWalletCardState: WalletCardState = {
  showBankModal: false,
  showP2PModal: false,
  showReciveFundsModal: false,
  bankModalType: 'deposit',
};

export const provideDefaultMockStoreState = () => ({
  [CUSTOMER_KEY_FEAUTRE]: defaultCustomerState,
  [WALLET_FEATURE_KEY]: defaultWalletState,
  [WALLET_CARD_FEATURE_KEY]: defaultWalletCardState,
});

export const createMockRouterLoadingService = (
  phase: 'idle' | 'navigating' | 'guards' | 'resolving' | 'activating' = 'idle',
) => ({
  phase: signal(phase),
  loadingRoute: signal(''),
  isNavigating: signal(phase !== 'idle'),
  phaseMessage: signal(''),
  isLoading: signal(phase !== 'idle'),
  startLoading: vi.fn(),
  stopLoading: vi.fn(),
  isKeyLoading: vi.fn(() => false),
});
