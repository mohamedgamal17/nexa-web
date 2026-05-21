import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OnbaordingAddressStep } from './onbaording-address-step';
import { TranslateModule } from '@ngx-translate/core';

import { describe } from 'vitest';
import { OnboadringAddressStepTestIds } from './onboarding-address-step.test-ids';
import {
  setPrimeInput,
  selectPrimeOption,
  clickPrimeButton,
} from '../../../../../testing/ng-prime-test.utilities';

describe('OnboardingAddressStep', () => {
  let component: OnbaordingAddressStep;
  let fixture: ComponentFixture<OnbaordingAddressStep>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnbaordingAddressStep, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(OnbaordingAddressStep);

    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should set country value on country change', ()=>{
    component.handleCountryChange("US")
    expect(component.selectedCountry()).toBe('US')   
  })

  it('should return country states when country change',()=>{
    component.selectedCountry.set("US")
    console.log(component.selectedCountry())
    expect(component.filteredStates().length).greaterThan(0)
  })

  it('should emit step back event when step back is clicked', ()=>{
    const spyOnStepBack = vi.spyOn(component.stepBack, 'emit')
    component.handleStepBack()
    expect(spyOnStepBack)
  })

  it('should emit submit on address form submit', ()=>{
    const spyOnSubmit = vi.spyOn(component.submited,'emit')

    component.addressForm.patchValue({
      country : 'US',
      state : "CA",
      city :"Arizona",
      streetLine : "31 Arizona street",
      postalCode : "44514",
      zipCode : "45144"
    })

    fixture.detectChanges()

    component.handleSubmit(new Event('submit') as any)

    expect(spyOnSubmit).toHaveBeenCalledOnce()
  })
});


