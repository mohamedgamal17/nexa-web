import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WalletList } from './wallet-list';

describe('WalletList', () => {
  let component: WalletList;
  let fixture: ComponentFixture<WalletList>;

  const mockWallets = [
    { id: '1', number: '123', balance: 100, userId: 'u', customerId: 'c' },
    { id: '2', number: '456', balance: 200, userId: 'u', customerId: 'c' },
  ] as never[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WalletList],
    }).compileComponents();

    fixture = TestBed.createComponent(WalletList);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('wallets', mockWallets);
    fixture.componentRef.setInput('activeWallet', mockWallets[0]);
    fixture.componentRef.setInput('loading', false);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose wallets input', () => {
    expect(component.wallets().length).toBe(2);
  });

  it('should expose activeWallet input', () => {
    expect(component.activeWallet()).toEqual(mockWallets[0]);
  });

  it('should reflect loading input', () => {
    fixture.componentRef.setInput('loading', true);
    expect(component.loading()).toBe(true);
  });
});
