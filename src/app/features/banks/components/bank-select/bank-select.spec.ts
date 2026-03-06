import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankSelect } from './bank-select';

describe('BankSelect', () => {
  let component: BankSelect;
  let fixture: ComponentFixture<BankSelect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankSelect],
    }).compileComponents();

    fixture = TestBed.createComponent(BankSelect);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
