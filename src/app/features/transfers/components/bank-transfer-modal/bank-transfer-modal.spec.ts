import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankWithdrawlModal } from './bank-transfer-modal';

describe('BankWithdrawlModal', () => {
  let component: BankWithdrawlModal;
  let fixture: ComponentFixture<BankWithdrawlModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankWithdrawlModal],
    }).compileComponents();

    fixture = TestBed.createComponent(BankWithdrawlModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
