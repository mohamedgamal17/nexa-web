import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferModal } from './transfer-modal';
import { TranslateModule } from '@ngx-translate/core';
import { WalletCardState } from '../../../wallets/state/wallet.reducer';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { walletCardActions } from '../../../wallets/state/wallet.actions';

describe('TransferModal', () => {
  let component: TransferModal;
  let fixture: ComponentFixture<TransferModal>;
  const walletCardState: WalletCardState = {
    showBankModal: false,
    showP2PModal: false,
    showReciveFundsModal: false,
    bankModalType: 'deposit',
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransferModal, TranslateModule.forRoot()],
      providers: [
        provideMockStore({
          initialState: {
            'wallet-card': walletCardState,
          },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TransferModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit walletSearch event when search is called', () => {
    var emitSpy = vi.spyOn(component.walletSearch, 'emit');
    component.search('test');
    expect(emitSpy).toHaveBeenCalledWith('test');
  });

  it('should emit submitied event with form value when handleSubmit is called and form is valid', () => {
    component.transferForm.patchValue({
      reciverWallet: { id: 1, number: '123', balance: 1000 },
      amount: 100,
    });
    var emitSpy = vi.spyOn(component.submitied, 'emit');
    component.handleFormSubmit(new Event('submit') as SubmitEvent);
    expect(emitSpy).toHaveBeenCalledWith({
      reciverWallet: { id: 1, number: '123', balance: 1000 },
      amount: 100,
    });
  });

  it('should not emit submitied event when handleSubmit is called and form is invalid', () => {
    var emitSpy = vi.spyOn(component.submitied, 'emit');
    component.handleFormSubmit(new Event('submit') as SubmitEvent);
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should set max amount when setMaxValue is called', () => {
    const wallet = { id: "500", userId:"user_1" , customerId:"wallet_1", number: '123', balance: 500 };
    fixture.componentRef.setInput('activeWallet', wallet);
    component.setMaxValue();
    expect(component.transferForm.value.amount).toBe(500);   
  }); 

  it('should dispatch toggleP2PTransferModal while toggleDialog is called', () => {
    const store = TestBed.inject(Store);
    var dispatchSpy = vi.spyOn(store, 'dispatch');
    component.toggleDialog();
    expect(dispatchSpy).toHaveBeenCalledWith(
      walletCardActions.toggleP2PTransferModal(),
    );
  });
});
