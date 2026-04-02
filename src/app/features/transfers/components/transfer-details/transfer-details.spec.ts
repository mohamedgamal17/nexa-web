import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferDetails } from './transfer-details';
import { Transfer } from '../../interfaces/transfer.interface';
import { walletState } from '../../../wallets/state/wallet.selectors';
import { Gender } from '../../../customers/enums/gender.enum';
import { TransferDirection } from '../../enums/transfer-direction.enum';
import { TransferType } from '../../enums/transfer-type.enum';
import { TransferStatus } from '../../enums/transfer-status.enum';
import { ComponentRef } from '@angular/core';

describe('TransferDetails', () => {
  let component: TransferDetails;
  let fixture: ComponentFixture<TransferDetails>;

  const networkTransfer: Transfer = {
    id: 'tr_1001',
    userId: 'user_1',
    walletId: 'wallet_1',
    wallet: {
      id: 'wallet_1',
      userId: 'user_1',
      customerId: 'customer_1',
      number: 'WALLET-12345678',
      customer: {
        id: 'customer_1',
        userId: 'user_1',
        info: {
          firstName: 'John',
          lastName: 'Doe',
          gender: Gender.Male,
          birthDate: new Date('1990-01-01').toString(),
        },
      },
      balance: 5200,
    },

    number: 'TXN-98453211',
    amount: 250.75,

    reciverId: 'wallet_2',
    reciver: {
      id: 'wallet_2',
      balance: 1300,
      customerId: 'customer_2',
      userId: 'user_2',
      number: 'WALLET-87654321',
      customer: {
        id: 'customer_2',
        userId: 'user_2',
        info: {
          firstName: 'Jane',
          lastName: 'Smith',
          gender: Gender.Male,
          birthDate: new Date('1985-05-15').toString(),
        },
      },
    },
    direction: TransferDirection.depit,
    type: TransferType.network,
    status: TransferStatus.completed,
    completedAt: new Date('2026-03-20T14:32:00Z'),
  };

  const withdrawBankTransfer: Transfer = {
    id: 'tr_1002',
    number: 'TXN-98453212',
    userId: 'user_1',
    walletId: 'wallet_1',
    wallet: {
      id: 'wallet_1',
      userId: 'user_1',
      customerId: 'customer_1',
      number: 'WALLET-12345678',
      customer: {
        id: 'customer_1',
        userId: 'user_1',
        info: {
          firstName: 'John',
          lastName: 'Doe',
          gender: Gender.Male,
          birthDate: new Date('1990-01-01').toString(),
        },
      },
      balance: 5200,
    },
    fundingResourceId: 'bank_1',
    fundingResource: {
      id: 'bank_1',
      userId: 'user_1',
      customerId: 'customer_1',
      country: 'US',
      currency: 'USD',
      holderName: 'John Doe',
      providerBankAccountId: 'bank_acc_12345678',

      bankName: 'Bank of Angular',
      accountNumberLast4: '****5678',
      routingNumber: '110000000',
    },
    amount: 500.0,
    direction: TransferDirection.depit,
    type: TransferType.bank,
    status: TransferStatus.completed,
    completedAt: new Date('2026-04-10T10:15:00Z'),
  };

  const depositBankTransfer: Transfer = {
    id: 'tr_1003',
    number: 'TXN-98453213',
    userId: 'user_1',
    walletId: 'wallet_1',
    wallet: {
      id: 'wallet_1',
      userId: 'user_1',
      customerId: 'customer_1',
      number: 'WALLET-12345678',
      customer: {
        id: 'customer_1',
        userId: 'user_1',
        info: {
          firstName: 'John',
          lastName: 'Doe',
          gender: Gender.Male,
          birthDate: new Date('1990-01-01').toString(),
        },
      },
      balance: 5200,
    },
    fundingResourceId: 'bank_1',
    fundingResource: {
      id: 'bank_1',
      userId: 'user_1',
      customerId: 'customer_1',
      country: 'US',
      currency: 'USD',
      holderName: 'John Doe',
      providerBankAccountId: 'bank_acc_12345678',

      bankName: 'Bank of Angular',
      accountNumberLast4: '****5678',
      routingNumber: '110000000',
    },
    amount: 750.0,
    direction: TransferDirection.credit,
    type: TransferType.bank,
    status: TransferStatus.completed,
    completedAt: new Date('2026-05-05T16:45:00Z'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransferDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(TransferDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it.each([
    {
      name: 'network transfer',
      transfer: networkTransfer,
      expected: 'heroArrowUpRightSolid',
    },
    {
      name: 'bank transfer with debit direction',
      transfer: withdrawBankTransfer,
      expected: 'heroArrowUpRightSolid',
    },
    {
      name: 'bank transfer with credit direction',
      transfer: depositBankTransfer,
      expected: 'heroArrowDownLeftSolid',
    },
  ])('should return correct arrow icon for $name', ({ transfer, expected }) => {
    fixture.componentRef.setInput('transfer', transfer);
    const icon = component.getTransferIcon();
    expect(icon).toBe(expected);
  });

  it.each([
    {
      name: 'network transfer',
      transfer: networkTransfer,
      expected: 'Wallet to wallet',
    },
    {
      name: 'bank transfer with depit direction',
      transfer: withdrawBankTransfer,
      expected: 'Wallet to bank',
    },
    {
      name: 'bank transfer with credit direction',
      transfer: depositBankTransfer,
      expected: 'Bank to wallet',
    },
  ])('should return correct title for $name', ({ transfer, expected }) => {
    fixture.componentRef.setInput('transfer', transfer);
    const title = component.getTransferTitle();
    expect(title).toBe(expected);
  });

  it.each([
    {
      name: 'network transfer',
      transfer: networkTransfer,
      expectedSourceName:
        networkTransfer.wallet.customer?.info.firstName +
        ' ' +
        networkTransfer.wallet.customer?.info.lastName,
    },
    {
      name: 'bank transfer with depit direction',
      transfer: withdrawBankTransfer,
      expectedSourceName:
        withdrawBankTransfer.wallet.customer?.info.firstName +
        ' ' +
        withdrawBankTransfer.wallet.customer?.info.lastName,
    },
    {
      name: 'bank transfer with credit direction',
      transfer: depositBankTransfer,
      expectedSourceName: depositBankTransfer.fundingResource?.bankName,
    },
  ])(
    'should return correct source name for transfer type and direction for $name',
    ({ transfer, expectedSourceName }) => {
      fixture.componentRef.setInput('transfer', transfer);
      var sourceName = component.getSourceName();
      expect(sourceName).toBe(expectedSourceName);
    },
  );

  it.each([
    {
      name: 'network transfer',
      transfer: networkTransfer,
      expectedDestinationSign: '-',
    },
    {
      name: 'bank transfer with depit direction',
      transfer: withdrawBankTransfer,
      expectedDestinationSign: '-',
    },
    {
      name: 'bank transfer with credit direction',
      transfer: depositBankTransfer,
      expectedDestinationSign: '+',
    },
  ])(
    'should return correct amount sign for transfer type and direction for $name',
    ({ transfer, expectedDestinationSign }) => {
      fixture.componentRef.setInput('transfer', transfer);
      var destinationName = component.getAmountSign();
      expect(destinationName).toBe(expectedDestinationSign);
    },
  );

  it.each([
    {
      name: 'network transfer',
      transfer: networkTransfer,
      expectedAmountColor: 'text-danger',
    },
    {
      name: 'bank transfer with depit direction',
      transfer: withdrawBankTransfer,
      expectedAmountColor: 'text-danger',
    },
    {
      name: 'bank transfer with credit direction',
      transfer: depositBankTransfer,
      expectedAmountColor: 'text-success',
    },
  ])(
    'should return correct destination name for transfer type and direction for $name',
    ({ transfer, expectedAmountColor }) => {
      fixture.componentRef.setInput('transfer', transfer);
      var destinationName = component.getAmountColor();
      expect(destinationName).toBe(expectedAmountColor);
    },
  );

  it.each([
    {
      name: 'transfer status pending',
      transfer: {...networkTransfer, status : TransferStatus.pending},
      expectedBadgecolor:'bg-secondary-subtle text-secondary'
    },
    {
      name: 'transfer status processing',
      transfer: {...networkTransfer, status : TransferStatus.processing},
      expectedBadgecolor:'bg-info-subtle text-info'
    },
    {
      name: 'transfer status completed',
      transfer: {...depositBankTransfer, status : TransferStatus.completed},
      expectedBadgecolor:'bg-success-subtle text-success'
    },  
    {
      name: 'transafer status failed',
      transfer: {...depositBankTransfer, status : TransferStatus.faild},
      expectedBadgecolor:'bg-danger-subtle text-danger'   
    }
  ])('should return correct badge color for transfer status for $name', ({transfer, expectedBadgecolor}) => {
    fixture.componentRef.setInput('transfer', transfer);
    var badgeColor = component.getBadgeColor();
    expect(badgeColor).toBe(expectedBadgecolor);
   });


  it.each([
    {
      name: 'transfer status pending',
      transfer: {...networkTransfer, status : TransferStatus.pending},text:'bg-secondary-subtle text-secondary',
      expectedBadgetext:'pending'
    },
    {
      name: 'transfer status processing',
      transfer: {...networkTransfer, status : TransferStatus.processing},
      expectedBadgetext:'processing'
    },
    {
      name: 'transfer status completed',
      transfer: {...depositBankTransfer, status : TransferStatus.completed},
      expectedBadgetext:'completed'
    },  
    {
      name: 'transafer status failed',
      transfer: {...depositBankTransfer, status : TransferStatus.faild},
      expectedBadgetext:'faild'   
    }
  ])('should return correct badge text for transfer status for $name', ({transfer, expectedBadgetext}) => {
    fixture.componentRef.setInput('transfer', transfer);
    var badgeColor = component.getBadgeText();
    expect(badgeColor).toBe(expectedBadgetext);
   });
});
