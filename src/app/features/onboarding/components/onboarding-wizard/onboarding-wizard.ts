import { Component, OnInit, output, Signal } from '@angular/core';
import { ProgressBarModule } from 'primeng/progressbar';
import { OnboardingEmailStep } from "../onboarding-email-step/onboarding-email-step";
import { OnboardingStepStateService } from '../../services/onboarding-step-state.service';
import { OnboardingStepState } from '../../enums/onboarding-state.enum';


@Component({
  selector: 'app-onboarding-wizard',
  imports: [ProgressBarModule, OnboardingEmailStep],
  templateUrl: './onboarding-wizard.html',
  styleUrl: './onboarding-wizard.scss',
})
export class OnboardingWizard implements OnInit  {

  OnboardingStepState = OnboardingStepState

  currentStepState :Signal<OnboardingStepState>

  currentStepNumber : Signal<number>

  totalSteps : number

  emailSubmited = output<{email : string}>()

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

}
