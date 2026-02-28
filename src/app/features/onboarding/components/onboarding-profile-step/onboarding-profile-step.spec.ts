import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingProfileStep } from './onboarding-profile-step';

describe('OnboardingProfileStep', () => {
  let component: OnboardingProfileStep;
  let fixture: ComponentFixture<OnboardingProfileStep>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnboardingProfileStep],
    }).compileComponents();

    fixture = TestBed.createComponent(OnboardingProfileStep);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
