import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletListItemSkeleton } from './wallet-list-item-skeleton';

describe('WalletListItemSkeleton', () => {
  let component: WalletListItemSkeleton;
  let fixture: ComponentFixture<WalletListItemSkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WalletListItemSkeleton],
    }).compileComponents();

    fixture = TestBed.createComponent(WalletListItemSkeleton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
