import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexPage } from './index-page';
import { BankService } from '../../services/bank.service';
import { StripeService } from '../../services/stripe.service';
import { BankingTokenService } from '../../services/banking-token.service';
import { of, throwError } from 'rxjs';
import { Bank } from '../../interfaces/bank.interface';
import { PagingResponse } from '../../../../core/models/paging-response.interface';
import {
  ErrorModel,
} from '../../../../core/models/error-model.interface';

describe('IndexPage', () => {
  let component: IndexPage;
  let fixture: ComponentFixture<IndexPage>;
  let bankServiceMock: { getAllBanks: ReturnType<typeof vi.fn> };
  let stripeServiceMock: { collectBankAccount: ReturnType<typeof vi.fn> };
  let bankingTokenService: {
    create: ReturnType<typeof vi.fn>;
    complete: ReturnType<typeof vi.fn>;
  };

  const erorrResponse: ErrorModel = {
    message: 'Internal Server Error',
    title: 'Internal Server Error',
    type: 'server',
  };

  const apiResponse: PagingResponse<Bank> = {
    info: {
      skip: 0,
      length: 10,
      totalCount: 100,
    },
    data: [
      {
        id: 'bank_1',
        userId: 'user_a8f3k2',
        customerId: 'cust_91jd82',
        providerBankAccountId: 'prov_ak39dk20x1',
        holderName: 'Mohamed Ali',
        bankName: 'CIB Egypt',
        country: 'EG',
        currency: 'EGP',
        accountNumberLast4: '4821',
        routingNumber: '123456789',
      },
    ],
  };

  beforeEach(async () => {
    bankServiceMock = {
      getAllBanks: vi.fn().mockReturnValue(of(apiResponse)),
    };

    stripeServiceMock = {
      collectBankAccount: vi.fn(),
    };

    bankingTokenService = {
      create: vi.fn(),
      complete: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [IndexPage],
      providers: [
        { provide: BankService, useValue: bankServiceMock },
        { provide: StripeService, useValue: stripeServiceMock },
        { provide: BankingTokenService, useValue: bankingTokenService },
      ],
    }).compileComponents();
  });

  function createComponent(): void {
    fixture = TestBed.createComponent(IndexPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  it('should create', () => {
    createComponent();
    expect(component).toBeTruthy();
  });

  it('should call getAllBanks on init', async () => {
    createComponent();
    await fixture.whenStable();
    expect(bankServiceMock.getAllBanks).toHaveBeenCalled();
    expect(component.bankResource.value()).toEqual(apiResponse);
  });

  it('should update linkedBankState on connectToBank success', async () => {
    createComponent();
    const completeResponse = { id: 'linked_bank_123' };

    bankingTokenService.create.mockReturnValue(of({ token: 'bank_token_123' }));
    stripeServiceMock.collectBankAccount.mockReturnValue(
      of({ id: 'bank_account_123' }),
    );
    bankingTokenService.complete.mockReturnValue(of(completeResponse));

    component.connectToBank();
    await fixture.whenStable();

    expect(component.linkedBankState()).toStrictEqual({
      bank: completeResponse,
      progress: 'Completed',
    });
  });

  it('should set error in linkedBankState when creating bank token fails', async () => {
    createComponent();
    bankingTokenService.create.mockReturnValue(throwError(() => erorrResponse));

    component.connectToBank();
    await fixture.whenStable();

    expect(component.linkedBankState()).toStrictEqual({
      progress: 'Error',
      error: erorrResponse,
    });
  });

  it('should set error in linkedBankState when collectBankAccount fails', async () => {
    createComponent();
    bankingTokenService.create.mockReturnValue(of({ token: 'bank_token_123' }));
    stripeServiceMock.collectBankAccount.mockReturnValue(
      throwError(() => erorrResponse),
    );

    component.connectToBank();
    await fixture.whenStable();

    expect(component.linkedBankState()).toStrictEqual({
      progress: 'Error',
      error: erorrResponse,
    });
  });

  it('should set error in linkedBankState when completing bank token fails', async () => {
    createComponent();
    bankingTokenService.create.mockReturnValue(of({ token: 'bank_token_123' }));
    stripeServiceMock.collectBankAccount.mockReturnValue(
      of({ id: 'bank_account_123' }),
    );
    bankingTokenService.complete.mockReturnValue(throwError(() => erorrResponse));

    component.connectToBank();
    await fixture.whenStable();

    expect(component.linkedBankState()).toStrictEqual({
      progress: 'Error',
      error: erorrResponse,
    });
  });
});

describe('IndexPage resource errors', () => {
  let component: IndexPage;
  let fixture: ComponentFixture<IndexPage>;
  let bankServiceMock: { getAllBanks: ReturnType<typeof vi.fn> };

  const erorrResponse: ErrorModel = {
    message: 'Internal Server Error',
    title: 'Internal Server Error',
    type: 'server',
  };

  beforeEach(async () => {
    bankServiceMock = {
      getAllBanks: vi.fn().mockReturnValue(
        throwError(() => {
          const err = new Error('Failed to load banks');
          err.cause = erorrResponse;
          return err;
        }),
      ),
    };

    await TestBed.configureTestingModule({
      imports: [IndexPage],
      providers: [
        { provide: BankService, useValue: bankServiceMock },
        { provide: StripeService, useValue: { collectBankAccount: vi.fn() } },
        {
          provide: BankingTokenService,
          useValue: { create: vi.fn(), complete: vi.fn() },
        },
      ],
    })
      .overrideComponent(IndexPage, { set: { template: '' } })
      .compileComponents();

    fixture = TestBed.createComponent(IndexPage);
    component = fixture.componentInstance;
  });

  it('should set error when getAllBanks returns an error', async () => {
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(component.error()).toStrictEqual(erorrResponse);
  });
});
