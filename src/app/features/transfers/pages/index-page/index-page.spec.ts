import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IndexPage } from './index-page';
import { provideMockStore } from '@ngrx/store/testing';
import { TransferServiceService } from '../../services/transfer-service.service';
import { of } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import {
  defaultWalletState,
  provideDefaultMockStoreState,
} from '../../../../../testing/test-providers';
import { WALLET_FEATURE_KEY } from '../../../wallets/state/wallet.reducer';

describe('IndexPage', () => {
  let component: IndexPage;
  let fixture: ComponentFixture<IndexPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexPage, TranslateModule.forRoot()],
      providers: [
        provideMockStore({
          initialState: {
            ...provideDefaultMockStoreState(),
            [WALLET_FEATURE_KEY]: {
              ...defaultWalletState,
              loaded: true,
              activeWallet: { id: 'w1', number: '123', balance: 100 } as never,
            },
          },
        }),
        {
          provide: TransferServiceService,
          useValue: {
            getAllTransfers: vi.fn(() =>
              of({ data: [], info: { skip: 0, length: 10, totalCount: 0 } }),
            ),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(IndexPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should read active wallet from store', () => {
    expect(component.activeWallet()?.id).toBe('w1');
  });

  it('should update transfer skip on page change', () => {
    component.onPageChange({ first: 10, rows: 10 } as never);
    expect(component.transferSkip()).toBe(10);
  });
});
