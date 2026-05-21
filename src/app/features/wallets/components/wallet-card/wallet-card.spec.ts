import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletCard } from './wallet-card';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { WalletState } from '../../state/wallet.reducer';
import { vi } from 'vitest';
import { walletCardActions } from '../../state/wallet.actions';
describe('WalletCard', () => {
  let component: WalletCard;
  let fixture: ComponentFixture<WalletCard>;
  let store: MockStore;
  const walletInitialState: WalletState = {
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
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WalletCard],
      providers: [provideMockStore({ initialState: walletInitialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(WalletCard);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch toggleP2PTransferModal action on showP2PModal call', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    component.showP2PModal();
    expect(dispatchSpy).toHaveBeenCalledWith(
      walletCardActions.toggleP2PTransferModal(),
    );
  });

  it('should dispatch toggleBankTransferModal action with deposit on showDepositModal call', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    component.showDepositModal();
    expect(dispatchSpy).toHaveBeenCalledWith(
      walletCardActions.toggleBankTransferModal({ modalType: 'deposit' }),
    );
  });

  it('should dispatch toggleBankTransferModal action with withdraw on showWithdrawModal call', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    component.showWithdrawModal();
    expect(dispatchSpy).toHaveBeenCalledWith(
      walletCardActions.toggleBankTransferModal({ modalType: 'withdraw' }),
    );
  });

  it('should dispatch toggleReciveFundsModal action on showReciveFundsModal call', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    component.showReciveFundsModal();
    expect(dispatchSpy).toHaveBeenCalledWith(
      walletCardActions.toggleReciveFundsModal(),
    );
  });
});
