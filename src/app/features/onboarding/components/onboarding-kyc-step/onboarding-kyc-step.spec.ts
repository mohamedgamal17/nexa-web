import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingKycStep } from './onboarding-kyc-step';

describe('OnboardingKycStep', () => {
  let component: OnboardingKycStep;
  let fixture: ComponentFixture<OnboardingKycStep>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnboardingKycStep],
    }).compileComponents();

    fixture = TestBed.createComponent(OnboardingKycStep);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
