import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickActions } from './quick-actions';
import {
  WALLET_CARD_FEATURE_KEY,
  WalletCardState,
} from '../../../wallets/state/wallet.reducer';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { walletCardActions } from '../../../wallets/state/wallet.actions';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('QuickActions', () => {
  let component: QuickActions;
  let fixture: ComponentFixture<QuickActions>;
  const routerMock = {
    navigate: vi.fn(),
    navigateByUrl: vi.fn(),
    url: '/home',
    events: of(), // RxJS stream
    createUrlTree: vi.fn(),
    serializeUrl: vi.fn(),
  };
  const walletInitialState: WalletCardState = {
    showP2PModal: false,
    showBankModal: false,
    showReciveFundsModal: false,
    bankModalType: 'deposit',
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuickActions],
      providers: [
        { provide: Router, useValue: routerMock },
        provideMockStore({
          initialState: {
            [WALLET_CARD_FEATURE_KEY]: walletInitialState,
          },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(QuickActions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch toggleP2PTransferModal action while calling toggleP2PTransferModal', () => {
    const store = TestBed.inject(Store);
    const dispatchSpy = vi.spyOn(store, 'dispatch');

    component.toggleP2PTransferModal();

    expect(dispatchSpy).toHaveBeenCalledWith(
      walletCardActions.toggleP2PTransferModal(),
    );
  });

  it('should dispatch toggleBankTransferModal action with type deposit while calling toggleBankTransferModal with deposit', () => {
    const store = TestBed.inject(Store);
    const dispatchSpy = vi.spyOn(store, 'dispatch');

    component.toggleBankTransferModal('deposit');

    expect(dispatchSpy).toHaveBeenCalledWith(
      walletCardActions.toggleBankTransferModal({ modalType: 'deposit' }),
    );
  });

  it('should dispatch toggleBankTransferModal action with type withdraw while calling toggleBankTransferModal with withdraw', () => {
    const store = TestBed.inject(Store);
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    component.toggleBankTransferModal('withdraw');
    expect(dispatchSpy).toHaveBeenCalledWith(
      walletCardActions.toggleBankTransferModal({ modalType: 'withdraw' }),
    );
  });

  it('should navigate to /wallet/recive-funds while calling toggleReciveFundsModal', () => {
    const url = '/test';
    component.navigateToUrl(url);
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith(url);
  });
});
