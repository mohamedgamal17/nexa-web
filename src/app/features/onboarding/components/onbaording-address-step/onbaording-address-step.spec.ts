import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnbaordingAddressStep } from './onbaording-address-step';

describe('OnbaordingAddressStep', () => {
  let component: OnbaordingAddressStep;
  let fixture: ComponentFixture<OnbaordingAddressStep>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnbaordingAddressStep],
    }).compileComponents();

    fixture = TestBed.createComponent(OnbaordingAddressStep);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
