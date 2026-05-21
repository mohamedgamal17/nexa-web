import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WalletContainer } from './wallet-container';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { WalletService } from '../../services/wallet.service';
import { TransferServiceService } from '../../../transfers/services/transfer-service.service';
import { MessageService } from 'primeng/api';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { StripeService } from '../../../banks/services/stripe.service';
import { BankingTokenService } from '../../../banks/services/banking-token.service';
import { BankService } from '../../../banks/services/bank.service';
import { of, throwError } from 'rxjs';
import { walletActions } from '../../state/wallet.actions';
import {
  defaultWalletState,
  provideDefaultMockStoreState,
} from '../../../../../testing/test-providers';
import { WALLET_FEATURE_KEY } from '../../state/wallet.reducer';
import { mockTranslateService } from '../../../../../testing/mocks/translate-service.mock';

describe('WalletContainer', () => {
  let component: WalletContainer;
  let fixture: ComponentFixture<WalletContainer>;
  let store: MockStore;
  let walletService: { getAllWallets: ReturnType<typeof vi.fn> };
  let messageService: { add: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    walletService = {
      getAllWallets: vi.fn(() =>
        of({ data: [{ id: '1', number: '99', balance: 100 }], info: {} }),
      ),
    };
    messageService = { add: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [WalletContainer, TranslateModule.forRoot()],
      providers: [
        provideMockStore({
          initialState: {
            ...provideDefaultMockStoreState(),
            [WALLET_FEATURE_KEY]: { ...defaultWalletState, loaded: false },
          },
        }),
        { provide: WalletService, useValue: walletService },
        {
          provide: TransferServiceService,
          useValue: {
            createNetworkTransfer: vi.fn(() => of({})),
            createBankTransfer: vi.fn(() => of({})),
          },
        },
        { provide: TranslateService, useValue: mockTranslateService },
        { provide: StripeService, useValue: {} },
        { provide: BankingTokenService, useValue: {} },
        { provide: BankService, useValue: { getAllBanks: vi.fn(() => of([])) } },
      ],
    })
      .overrideComponent(WalletContainer, {
        set: {
          template: '',
          imports: [],
          providers: [{ provide: MessageService, useValue: messageService }],
        },
      })
      .compileComponents();

    store = TestBed.inject(MockStore);
    vi.spyOn(store, 'dispatch');
    fixture = TestBed.createComponent(WalletContainer);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadWallets when wallets are not loaded', () => {
    TestBed.flushEffects();
    expect(store.dispatch).toHaveBeenCalledWith(
      walletActions.loadWallets({
        paging: { skip: 0, length: component.pagingLength },
      }),
    );
  });

  it('should update searchWallets on searchWalletByNumber success', () => {
    component.searchWalletByNumber('99');
    expect(walletService.getAllWallets).toHaveBeenCalled();
    expect(component.searchWallets().length).toBe(1);
  });

  it('should show error toast when searchWalletByNumber fails', () => {
    walletService.getAllWallets.mockReturnValueOnce(
      throwError(() => ({ title: 'Error', message: 'Failed' })),
    );
    component.searchWalletByNumber('99');
    expect(messageService.add).toHaveBeenCalled();
  });
});
