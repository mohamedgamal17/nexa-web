import { Component, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Card } from "primeng/card";
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroShieldCheck } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-onboarding-kyc-step',
  imports: [ButtonModule, Card, NgIcon],
  templateUrl: './onboarding-kyc-step.html',
  styleUrl: './onboarding-kyc-step.scss',
  viewProviders: [provideIcons({  heroShieldCheck })]

})
export class OnboardingKycStep {
  loading = input(false)

}
