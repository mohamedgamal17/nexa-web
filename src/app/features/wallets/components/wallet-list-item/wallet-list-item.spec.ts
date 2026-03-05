import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletListItem } from './wallet-list-item';

describe('WalletListItem', () => {
  let component: WalletListItem;
  let fixture: ComponentFixture<WalletListItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WalletListItem],
    }).compileComponents();

    fixture = TestBed.createComponent(WalletListItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
