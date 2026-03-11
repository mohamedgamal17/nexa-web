import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankCardSkeleton } from './bank-card-skeleton';

describe('BankCardSkeleton', () => {
  let component: BankCardSkeleton;
  let fixture: ComponentFixture<BankCardSkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankCardSkeleton],
    }).compileComponents();

    fixture = TestBed.createComponent(BankCardSkeleton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
