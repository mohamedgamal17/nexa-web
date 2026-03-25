import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OnboardingPhoneStep } from './onboarding-phone-step';
import { TranslateModule } from '@ngx-translate/core';
import { vi } from 'vitest';
import { screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { OnboardingPhoneStepTestIds } from './onboarding-phone-step-test-ids';
import { PhoneValueModel } from '../../../../shared/components/phone-input/models/phone-value-model.interface';
import { parsePhoneNumber } from '../../../../shared/utils/phone-number.utils';

describe('OnbaordingPhoneStep', () => {
  let component: OnboardingPhoneStep;
  let fixture: ComponentFixture<OnboardingPhoneStep>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnboardingPhoneStep, TranslateModule.forRoot({})],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(OnboardingPhoneStep);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event submit when submit phone form', () => {
    const spyOnSubmited = vi.spyOn(component.submited, 'emit');

    component.phoneForm.patchValue({
      phone: <PhoneValueModel>{
        countryCode: 'US',
        dialCode: '1',
        number: '5703108015',
        international: '+15703108015',
      },
    });

    component.handleSubmit(new Event('submit') as any);

    expect(spyOnSubmited).toHaveBeenCalledOnce();
  });

  it('should emit step back evnet when step back button is clicked', () => {
    const spyOnStepback = vi.spyOn(component.stepBack, 'emit');

    component.handleStepBack()

    expect(spyOnStepback).toHaveBeenCalledOnce()
  });
});
