import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletContainer } from './wallet-container';

describe('WalletContainer', () => {
  let component: WalletContainer;
  let fixture: ComponentFixture<WalletContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WalletContainer],
    }).compileComponents();

    fixture = TestBed.createComponent(WalletContainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
