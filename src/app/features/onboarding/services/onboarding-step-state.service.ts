import { computed, Injectable, signal } from "@angular/core";
import { OnboardingStepState } from "../enums/onboarding-state.enum";

@Injectable({
  providedIn: "root"
})
export class OnboardingStepStateService {

  private _currentState = signal<OnboardingStepState>(OnboardingStepState.Phone);

  currentState = this._currentState.asReadonly()

  currentStepNumber = computed(() => {
    var currentState = this._currentState()
    
    if(currentState == OnboardingStepState.Email){
      return 1;
    }

    if(currentState == OnboardingStepState.Phone){
      return 2;
    }

    if(currentState == OnboardingStepState.Profile){
      return 3;
    }

    if(currentState == OnboardingStepState.Address){
      return 4;
    }

    return 4;
  })
  

  

  update(state: OnboardingStepState) {
    this._currentState.set(state)
  }

  getTotalSteps() {
    return Object.keys(OnboardingStepState).length - 1;
  }

}