import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankCard } from './bank-card';
import { Bank } from '../../interfaces/bank.interface';
import { inputBinding } from '@angular/core';

describe('BankCard', () => {
  let component: BankCard;
  let fixture: ComponentFixture<BankCard>;

  const fakeBank =  {
      id :"123",
      customerId :"cus-123",
      holderName :"Simple name",
      bankName :"Simple banke",
      country :"us",
      currency :"usd",
      accountNumberLast4 :"4544",
      routingNumber :"45121"
    }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankCard],
    }).compileComponents();

    fixture = TestBed.createComponent(BankCard)
    fixture.componentRef.setInput('bank', fakeBank)
    component = fixture.componentInstance;
    fixture.detectChanges()
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
