import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingKycStep } from './onboarding-kyc-step';
import { clickPrimeButton } from '../../../../../testing/ng-prime-test.utilities';
import { OnboardingKycStepTestIds } from './onboarding-kyc-step.test-ids';
import { Router } from '@angular/router';

describe('OnboardingKycStep', () => {
  let component: OnboardingKycStep;
  let fixture: ComponentFixture<OnboardingKycStep>;
  var routerMock: any;
  beforeEach(async () => {
    routerMock = {
      navigateByUrl: vi.fn(),
    };
    await TestBed.configureTestingModule({
      imports: [OnboardingKycStep],
      providers: [
        {
          provide: Router,
          useValue: routerMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OnboardingKycStep);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });
  it('should emit sumbited when submited button is clicked', () => {
    const spyOnSubmited = vi.spyOn(component.submited, 'emit');

    component.handleSubmit();

    expect(spyOnSubmited).toHaveBeenCalledOnce();
  });
});
