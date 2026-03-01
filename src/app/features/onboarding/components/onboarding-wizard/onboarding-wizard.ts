import { Component, input, OnInit, Output, output, Signal } from '@angular/core';
import { ProgressBarModule } from 'primeng/progressbar';
import { OnboardingEmailStep } from "../onboarding-email-step/onboarding-email-step";
import { OnboardingStepStateService } from '../../services/onboarding-step-state.service';
import { OnboardingStepState } from '../../enums/onboarding-state.enum';
import { OnboardingPhoneStep } from '../onboarding-phone-step/onboarding-phone-step';
import { PhoneValueModel } from '../../../../shared/components/phone-input/models/phone-value-model.interface';
import { OnboardingProfileStep } from '../onboarding-profile-step/onboarding-profile-step';
import { OnbaordingAddressStep } from '../onbaording-address-step/onbaording-address-step';
import { OnboardingKycStep } from '../onboarding-kyc-step/onboarding-kyc-step';
import { OnboardCustomer } from '../../interfaces/onboard-customer.interface';
import { CustomerInfo } from '../../../customers/interfaces/customer-info.interface';
import { Address } from '../../../customers/interfaces/address.interface';


@Component({
  selector: 'app-onboarding-wizard',
  imports: [ProgressBarModule, OnboardingEmailStep , OnboardingPhoneStep , OnboardingProfileStep, OnbaordingAddressStep, OnboardingKycStep],
  templateUrl: './onboarding-wizard.html',
  styleUrl: './onboarding-wizard.scss',
})
export class OnboardingWizard implements OnInit  {

  OnboardingStepState = OnboardingStepState

  currentStepState :Signal<OnboardingStepState>

  currentStepNumber : Signal<number>

  totalSteps : number


  onboardCustomer= input<OnboardCustomer | null>(null)

  isSubmiting = input(false)

  emailSubmited = output<{email : string}>()

  phoneSubmited = output<{phone : PhoneValueModel}>()

  infoSubmited = output<{info : CustomerInfo}>()

  addressSubmited = output<{address : Address}>()

  constructor(private onboardingStepStateService : OnboardingStepStateService){

  }

  ngOnInit(): void {
    this.currentStepState = this.onboardingStepStateService.currentState
    this.currentStepNumber = this.onboardingStepStateService.currentStepNumber
    this.totalSteps = this.onboardingStepStateService.getTotalSteps()

  }

  handleEmailSubmit($value : {email : string}){
    this.emailSubmited.emit($value)
  }

  handlePhoneSubmit($value : {phone : PhoneValueModel}){
    this.phoneSubmited.emit($value);
  }

  handleInfoSumbit($value :{info : CustomerInfo}){
    this.infoSubmited.emit($value)
  }

  handleAddressSubmit($value : {address :Address}){
    this.addressSubmited.emit($value)
  }

  getStepBarValue(){
    return (100 / this.onboardingStepStateService.getTotalSteps()) * 
      this.onboardingStepStateService.currentStepNumber()
  }

  updateStepState(state :OnboardingStepState){
    this.onboardingStepStateService.update(state)
  }
}
