import { Component, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Card } from "primeng/card";
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroShieldCheck } from '@ng-icons/heroicons/outline';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding-kyc-step',
  imports: [ButtonModule, Card, NgIcon],
  templateUrl: './onboarding-kyc-step.html',
  styleUrl: './onboarding-kyc-step.scss',
  viewProviders: [provideIcons({ heroShieldCheck })]

})
export class OnboardingKycStep {

  loading = input(false)
  submited = output<void>()

  constructor(private router :Router){

  }
  navigate() {
    this.router.navigateByUrl('/')
  }

  handleSubmit(){
    this.submited.emit()
  }

}
