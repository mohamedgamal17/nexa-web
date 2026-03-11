import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankModal } from './bank-modal';

describe('BankModal', () => {
  let component: BankModal;
  let fixture: ComponentFixture<BankModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankModal],
    }).compileComponents();

    fixture = TestBed.createComponent(BankModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
