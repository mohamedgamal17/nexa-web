import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingPhoneStep } from './onboarding-phone-step';

describe('OnboardingPhoneStep', () => {
  let component: OnboardingPhoneStep;
  let fixture: ComponentFixture<OnboardingPhoneStep>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnboardingPhoneStep],
    }).compileComponents();

    fixture = TestBed.createComponent(OnboardingPhoneStep);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
