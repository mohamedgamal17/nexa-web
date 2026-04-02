import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankTransferModal } from './bank-transfer-modal';
import {
  WALLET_CARD_FEATURE_KEY,
  WalletCardState,
} from '../../../wallets/state/wallet.reducer';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { walletCardActions } from '../../../wallets/state/wallet.actions';

describe('BankWithdrawlModal', () => {
  let component: BankTransferModal;
  let fixture: ComponentFixture<BankTransferModal>;

  const walletInitialState: WalletCardState = {
    showP2PModal: false,
    showBankModal: false,
    showReciveFundsModal: false,
    bankModalType: 'deposit',
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankTransferModal],
      providers: [
        provideMockStore({
          initialState: {
            [WALLET_CARD_FEATURE_KEY]: walletInitialState,
          },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BankTransferModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch toggleBankTransferModal while  toggleModel is called', () => {
    const store = TestBed.inject(Store);
    var dispatchSpy = vi.spyOn(store, 'dispatch');
    component.toggleModel();
    expect(dispatchSpy).toHaveBeenCalledWith(
      walletCardActions.toggleBankTransferModal({}),
    );
  });

  it('should emit submit event with form value when handleSubmit is called and form is valid', () => {
    component.bankTansferForm.patchValue({
      amount: 100,
      bank: 'bank1',
    });
    var emitSpy = vi.spyOn(component.submitied, 'emit');
    component.handleSubmit(new Event('submit') as SubmitEvent);
    expect(emitSpy).toHaveBeenCalledWith({
      amount: 100,
      bank: 'bank1',
      type: component.type(),
    });
  });

  it('should not emit submit event when handleSubmit is called and form is invalid', () => {
    var emitSpy = vi.spyOn(component.submitied, 'emit');
    component.handleSubmit(new Event('submit') as SubmitEvent);
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should emit linkBankAccount event when handleLinkBankAccount is called', () => {
    var emitSpy = vi.spyOn(component.linkBankAccount, 'emit');
    component.handleLinkBankAccount();
    expect(emitSpy).toHaveBeenCalled();
  });
});
