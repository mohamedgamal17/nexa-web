import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BankCard } from './bank-card';

describe('BankCard', () => {
  let component: BankCard;
  let fixture: ComponentFixture<BankCard>;

  const fakeBank = {
    id: '123',
    customerId: 'cus-123',
    holderName: 'Simple name',
    bankName: 'Simple bank',
    country: 'us',
    currency: 'usd',
    accountNumberLast4: '4544',
    routingNumber: '45121',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankCard],
    }).compileComponents();

    fixture = TestBed.createComponent(BankCard);
    fixture.componentRef.setInput('bank', fakeBank);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose bank input', () => {
    expect(component.bank()).toEqual(fakeBank);
  });
});
