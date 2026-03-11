import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReciveFundsModal } from './recive-funds-modal';

describe('ReciveFundsModal', () => {
  let component: ReciveFundsModal;
  let fixture: ComponentFixture<ReciveFundsModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReciveFundsModal],
    }).compileComponents();

    fixture = TestBed.createComponent(ReciveFundsModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
