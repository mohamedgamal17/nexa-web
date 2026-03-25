import { ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { OnboardingProfileStep } from './onboarding-profile-step';
import { vi } from 'vitest';
import {
  clickPrimeButton,
  selectPrimeOption,
  setPrimeDatePicker,
  setPrimeInput,
} from '../../../../../testing/ng-prime-test.utilities';
import { OnboardingProfileStepTestIds } from './onboarding-profile-step.test-ids';
import { TranslateModule } from '@ngx-translate/core';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/angular';
import {
  BrowserAnimationsModule,
  provideNoopAnimations,
} from '@angular/platform-browser/animations';
import { Gender } from '../../../customers/enums/gender.enum';

describe('OnboardingProfileStep', () => {
  let component: OnboardingProfileStep;
  let fixture: ComponentFixture<OnboardingProfileStep>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnboardingProfileStep, TranslateModule.forRoot({})],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(OnboardingProfileStep);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit submit event on call handle submit',()=>{
    const spyOnSubmited = vi.spyOn(component.submited , 'emit')

    component.profileFormGroup.patchValue({
      firstName : 'John',
      lastName:'Doe',
      gender : Gender.Male,
      birthDate : '10/2/2001'
    })

    component.handleSubmit(new Event('submit') as any)

    expect(spyOnSubmited).toHaveBeenCalledOnce()
  })

  it('should emit stepback even on call handle step back',()=>{
    const spyOnStepback = vi.spyOn(component.stepBack , 'emit')

    component.handleStepBack()

    expect(spyOnStepback).toHaveBeenCalledOnce()
  })
});

