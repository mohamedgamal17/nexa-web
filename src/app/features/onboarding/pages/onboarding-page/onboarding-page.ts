import { Component, OnInit, signal, ViewChild, ViewRef } from '@angular/core';
import { OnboardingWizard } from "../../components/onboarding-wizard/onboarding-wizard";
import { OnboardCustomerService } from '../../services/onboard-customer.service';
import { OnboardCustomer } from '../../interfaces/onboard-customer.interface';
import { filter, forkJoin, map, mergeMap, of, Subscription, tap } from 'rxjs';
import { OnboardingStepState } from '../../enums/onboarding-state.enum';
import { OnboardingStepStateService } from '../../services/onboarding-step-state.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AuthService } from '@auth0/auth0-angular';
import { PhoneValueModel } from '../../../../shared/components/phone-input/models/phone-value-model.interface';
import { CustomerInfo } from '../../../customers/interfaces/customer-info.interface';
import { Address } from '../../../customers/interfaces/address.interface';
import { ComplyCubeService } from '../../services/comply-cube.service';
import { KycTokenService } from '../../../customers/services/kyc-token.service';
import { CustomerService } from '../../../customers/services/customer.service';
import { Customer } from '../../../customers/interfaces/customer.interface';
import { ComplyCubeEventData } from '../../interfaces/comply-cube-event-data.interface';
import { KycReviewService } from '../../../customers/services/kyc-reviews.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-onboarding-page',
  imports: [OnboardingWizard, ProgressSpinnerModule, ToastModule],
  providers :[MessageService],
  templateUrl: './onboarding-page.html',
  styleUrl: './onboarding-page.scss',
})
export class OnboardingPage implements OnInit {


  customer = signal<Customer | null>(null)
  onboardCustomer = signal<OnboardCustomer | null>(null)
  onboardingLoading = signal(false)
  isubmiting = signal(false)
  subscriptions: Subscription[] = []


  @ViewChild('complyCubeContainer') complyCubeContainer: HTMLElement

  constructor(
    private customerService: CustomerService,
    private onboardingCustomerService: OnboardCustomerService,
    private onboardingStepStateService: OnboardingStepStateService,
    private kycTokenService: KycTokenService,
    private kycReviewService : KycReviewService,
    private complyCubeService: ComplyCubeService,
    private messageService : MessageService
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
          console.log(value)
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

  handleInfoSubmited($event: { info: CustomerInfo }) {
    this.isubmiting.set(true)
    const subscription = this.onboardingCustomerService.updateOnboardCustomerInfo($event.info)
      .subscribe({
        next: (value) => {
          this.onboardCustomer.set(value)
          this.onboardingStepStateService.update(OnboardingStepState.Address)
          this.isubmiting.set(false)
        }
      })

    this.subscriptions.push(subscription)

  }


  handlePhoneSubmit($event: { phone: PhoneValueModel }) {
    this.isubmiting.set(true)
    const subscription = this.onboardingCustomerService.updateOnboardCustomerPhone({ phone: $event.phone.international })
      .subscribe({
        next: (value) => {
          this.onboardCustomer.set(value)
          this.onboardingStepStateService.update(OnboardingStepState.Profile)
          this.isubmiting.set(false)
        }
      })

    this.subscriptions.push(subscription)
  }

  handleAddressSubmit($event: { address: Address }) {
    this.isubmiting.set(true)
    const subscription = this.onboardingCustomerService.updateOnboardCustomerAddress($event.address)
      .pipe(
        tap((v) => this.onboardCustomer.set(v)),
        mergeMap((_) => this.onboardingCustomerService.completeOnboardCustomer())
      )
      .subscribe({
        next: (value) => {
          this.customer.set(value)
          this.onboardingStepStateService.update(OnboardingStepState.Completed)
          this.isubmiting.set(false)
        }
      })

    this.subscriptions.push(subscription)
  }

  handleKycSubmit() {
    this.isubmiting.set(true)
    const subscription = this.kycTokenService.createToken()
      .pipe(
        mergeMap(resp => this.complyCubeService.mount(resp.token, 'comblycube-container')),
        tap((event) => {
          if (event.type === 'closed') {
            this.isubmiting.set(false)
          }

          if (event.type === 'error') {
            this.isubmiting.set(false)
            console.log(event.error)
          }
        }),
        filter((event) => event.type === 'complete'),

        mergeMap(event =>
          forkJoin({
            event: of(event),
            customer: this.customerService.updateDocument({
              kycDocumentId: event.data?.documentId
            })
          })
        ),

        mergeMap(({ event, customer }) => {
          return forkJoin({
            customer : of(customer),
            review : this.kycReviewService.createReview()
          })
        })  
      )
    .subscribe({
      next : ({customer , review})=>{
        this.isubmiting.set(false)
        this.messageService.add({severity : 'success', summary:"Kyc completed."  , 
          detail :'Your have submited your kyc verification info the verification process in progress.'})
        this.customer.set(customer)
      }
    })
  }
}
