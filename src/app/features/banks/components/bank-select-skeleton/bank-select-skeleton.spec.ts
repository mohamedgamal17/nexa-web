import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankSelectSkeleton } from './bank-select-skeleton';

describe('BankSelectSkeleton', () => {
  let component: BankSelectSkeleton;
  let fixture: ComponentFixture<BankSelectSkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankSelectSkeleton],
    }).compileComponents();

    fixture = TestBed.createComponent(BankSelectSkeleton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    fixture.componentRef.setInput('size', 3)
    expect(component).toBeTruthy();
  });
});
