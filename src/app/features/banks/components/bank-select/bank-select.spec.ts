import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankSelect } from './bank-select';
import { Bank } from '../../interfaces/bank.interface';

describe('BankSelect', () => {
  let component: BankSelect;
  let fixture: ComponentFixture<BankSelect>;
  const banks: Bank[] = [
    {
      id: '1',
      userId: 'user_101',
      customerId: 'cust_abc123',
      providerBankAccountId: 'prov_acc_001',
      holderName: 'Mohamed Gamal',
      bankName: 'National Bank of Egypt',
      country: 'EG',
      currency: 'EGP',
      accountNumberLast4: '1234',
      routingNumber: 'NBE123456',
    },
    {
      id: '2',
      userId: 'user_102',
      customerId: 'cust_def456',
      providerBankAccountId: 'prov_acc_002',
      holderName: 'Ahmed Ali',
      bankName: 'Banque Misr',
      country: 'EG',
      currency: 'EGP',
      accountNumberLast4: '5678',
      routingNumber: 'BMISREGX',
    },
    {
      id: '3',
      userId: 'user_103',
      customerId: 'cust_ghi789',
      providerBankAccountId: 'prov_acc_003',
      holderName: 'Sara Hassan',
      bankName: 'HSBC',
      country: 'AE',
      currency: 'AED',
      accountNumberLast4: '9012',
      routingNumber: 'HSBCAEAD',
    },
    {
      id: '4',
      userId: 'user_104',
      customerId: 'cust_jkl012',
      providerBankAccountId: 'prov_acc_004',
      holderName: 'Omar Khaled',
      bankName: 'Citi Bank',
      country: 'US',
      currency: 'USD',
      accountNumberLast4: '3456',
      routingNumber: 'CITIUS33',
    },
  ];

  const selectedBank = banks[3];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankSelect],
    }).compileComponents();

    fixture = TestBed.createComponent(BankSelect);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    fixture.componentRef.setInput('banks', banks);
    expect(component).toBeTruthy();
  });

  it('should set the selected bank value when update selected bank is called', () => {
    fixture.componentRef.setInput('banks', banks);
    
    component.updateSelectedBank(selectedBank)

    expect(component.selectedBank()).toBeTruthy()

    expect(component.selectedBank()?.id).toBe(selectedBank.id)
  });
});
