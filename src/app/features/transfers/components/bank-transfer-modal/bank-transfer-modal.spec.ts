import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankTransferModal } from './bank-transfer-modal';

describe('BankWithdrawlModal', () => {
  let component: BankTransferModal;
  let fixture: ComponentFixture<BankTransferModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankTransferModal],
    }).compileComponents();

    fixture = TestBed.createComponent(BankTransferModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
