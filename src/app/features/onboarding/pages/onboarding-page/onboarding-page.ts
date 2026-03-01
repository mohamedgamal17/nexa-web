import { Component, OnInit, signal } from '@angular/core';
import { OnboardingWizard } from "../../components/onboarding-wizard/onboarding-wizard";
import { OnboardCustomerService } from '../../services/onboard-customer.service';
import { OnboardCustomer } from '../../interfaces/onboard-customer.interface';
import { Subscription } from 'rxjs';
import { OnboardingStepState } from '../../enums/onboarding-state.enum';
import { OnboardingStepStateService } from '../../services/onboarding-step-state.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-onboarding-page',
  imports: [OnboardingWizard, ProgressSpinnerModule],
  templateUrl: './onboarding-page.html',
  styleUrl: './onboarding-page.scss',
})
export class OnboardingPage implements OnInit {


  onboardCustomer = signal<OnboardCustomer | null>(null)
  onboardingLoading = signal(false)
  isubmiting = signal(false)
  subscriptions: Subscription[] = []

  constructor(
    private onboardingCustomerService: OnboardCustomerService,
    private onboardingStepStateService: OnboardingStepStateService
  ) {

  }

  ngOnInit(): void {
    this.getOnboardCustomer()
  }


  private getOnboardCustomer() {
    this.onboardingLoading.set(true)
    const subscription = this.onboardingCustomerService
      .getOrCreateOnboardCustomer()
      .subscribe({
        next: (value) => {
          this.onboardCustomer.set(value)
          this.onboardingStepStateService.extractStepState(value)
          this.onboardingLoading.set(false)
        }
      })
    this.subscriptions.push(subscription)
  }

  handleEmailSubmit($event: { email: string }) {
    this.isubmiting.set(true)
    const subscription = this.onboardingCustomerService.updateOnboardCustomerEmail($event)
      .subscribe({
        next: (value) => {
          this.onboardCustomer.set(value)
          this.onboardingStepStateService.update(OnboardingStepState.Phone)
          this.isubmiting.set(false)
        }
      })

    this.subscriptions.push(subscription)
  }


}
