import { Component } from '@angular/core';
import { OnboardingWizard } from "../../components/onboarding-wizard/onboarding-wizard";

@Component({
  selector: 'app-onboarding-page',
  imports: [OnboardingWizard],
  templateUrl: './onboarding-page.html',
  styleUrl: './onboarding-page.scss',
})
export class OnboardingPage {}
