import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WalletListItem } from './wallet-list-item';

describe('WalletListItem', () => {
  let component: WalletListItem;
  let fixture: ComponentFixture<WalletListItem>;

  const mockWallet = {
    id: '1',
    number: '1234567890',
    balance: 500,
    userId: 'u1',
    customerId: 'c1',
  } as never;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WalletListItem],
    }).compileComponents();

    fixture = TestBed.createComponent(WalletListItem);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('wallet', mockWallet);
    fixture.componentRef.setInput('active', true);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reflect active input', () => {
    expect(component.active()).toBe(true);
  });

  it('should reflect wallet input', () => {
    expect(component.wallet()).toEqual(mockWallet);
  });
});
