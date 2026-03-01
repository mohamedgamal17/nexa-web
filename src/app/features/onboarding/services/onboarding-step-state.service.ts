import { computed, Injectable, signal } from "@angular/core";
import { OnboardingStepState } from "../enums/onboarding-state.enum";
import { OnboardCustomer } from "../interfaces/onboard-customer.interface";
import { OnboardCustomerStatus } from "../enums/onboard-customer-status.enum";

@Injectable({
  providedIn: "root"
})
export class OnboardingStepStateService {

  private _currentState = signal<OnboardingStepState>(OnboardingStepState.Completed);

  currentState = this._currentState.asReadonly()

  currentStepNumber = computed(() => {
    var currentState = this._currentState()

    if (currentState == OnboardingStepState.Email) {
      return 1;
    }

    if (currentState == OnboardingStepState.Phone) {
      return 2;
    }

    if (currentState == OnboardingStepState.Profile) {
      return 3;
    }

    if (currentState == OnboardingStepState.Address) {
      return 4;
    }

    return 4;
  })



  extractStepState(onboarding: OnboardCustomer) {
    let state = OnboardingStepState.Email


    if (onboarding) {
      if (onboarding.emailAddressProvided) {
        state = OnboardingStepState.Phone
      }

      if (onboarding.phoneNumberProvided) {
        state = OnboardingStepState.Profile
      }

      if (onboarding.customerInfoProvided) {
       state = OnboardingStepState.Address
      }
      if (onboarding.addressProvided) {
       state = OnboardingStepState.Completed
      }
    }

    this._currentState.set(state)
  }

  update(state: OnboardingStepState) {
    this._currentState.set(state)
  }

  getTotalSteps() {
    return Object.keys(OnboardingStepState).length - 1;
  }

}