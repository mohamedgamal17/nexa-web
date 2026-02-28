import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingEmailStep } from './onboarding-email-step';

describe('OnboardingEmailStep', () => {
  let component: OnboardingEmailStep;
  let fixture: ComponentFixture<OnboardingEmailStep>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnboardingEmailStep],
    }).compileComponents();

    fixture = TestBed.createComponent(OnboardingEmailStep);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
