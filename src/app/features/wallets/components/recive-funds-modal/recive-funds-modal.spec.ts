import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReciveFundsModal } from './recive-funds-modal';
import { Clipboard } from '@angular/cdk/clipboard';
import { MessageService } from 'primeng/api';
import { Wallet } from '../../interfaces/wallet.interface';
import { TranslateService } from '@ngx-translate/core';
import { walletCardActions } from '../../state/wallet.actions';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import {
  WALLET_CARD_FEATURE_KEY,
  WalletCardState,
  WalletState,
} from '../../state/wallet.reducer';
describe('ReciveFundsModal', () => {
  let component: ReciveFundsModal;
  let fixture: ComponentFixture<ReciveFundsModal>;
  let clipboardMock: any;
  let messageServiceMock: any;
  let translateMock: any;
  let mockStore: Store;
  beforeEach(async () => {
    const walletInitialState: WalletCardState = {
      showP2PModal: false,
      showBankModal: false,
      showReciveFundsModal: false,
      bankModalType: 'deposit',
    };

    clipboardMock = {
      copy: vi.fn(),
    };

    messageServiceMock = {
      add: vi.fn(),
    };

    translateMock = {
      instant: vi.fn(),
      get: vi.fn(),
      stream: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [ReciveFundsModal],
      providers: [
        { provide: Clipboard, useValue: clipboardMock },
        { provide: MessageService, useValue: messageServiceMock },
        { provide: TranslateService, useValue: translateMock },
        provideMockStore({
          initialState: {
            [WALLET_CARD_FEATURE_KEY]: walletInitialState,
          },
        }),
      ],
    }).compileComponents();

    mockStore = TestBed.inject(Store);
    fixture = TestBed.createComponent(ReciveFundsModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle recive funds modal on toggleReciveFundsModal call', () => {
    const store = TestBed.inject(Store);
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    component.toggleReciveFundsModal();
    expect(dispatchSpy).toHaveBeenCalledWith(
      walletCardActions.toggleReciveFundsModal(),
    );
  });

  it('should copy wallet number and show success message on copyWalletNumber call and fire message toast', () => {
    const wallet: Wallet = {
      id: '1',
      userId: '1',
      customerId: '1',
      providerWalletId: '1',
      number: '1234567890',
      balance: 1000,
    };

    fixture.componentRef.setInput('wallet', wallet);

    clipboardMock.copy.mockReturnValue(true);

    component.copyWalletNumber();

    expect(clipboardMock.copy).toHaveBeenCalledWith(component.wallet()!.number);
    expect(translateMock.instant).toHaveBeenCalledWith(
      'toast.walletCopied.message',
    );
    expect(messageServiceMock.add).toHaveBeenCalled();
  });
});
