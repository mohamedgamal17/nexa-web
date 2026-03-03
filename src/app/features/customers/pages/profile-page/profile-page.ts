import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { ProfileHero } from '../../components/profile-hero/profile-hero';
import { ProfileContact } from '../../components/profile-contact/profile-contact';
import { ProfileInfo } from '../../components/profile-info/profile-info';
import { ProfileAddress } from '../../components/profile-address/profile-address';
import { ProfileDocument } from '../../components/profile-document/profile-document';
import { Store } from '@ngrx/store';
import { CUSTOMER_KEY_FEAUTRE, CustomerState } from '../../state/customer.reducer';
import { ErrorModel } from '../../../../core/models/error-model.interface';
import { selectCustomer, selectCustomerError, selectIsCustomerLoading } from '../../state/customer.selectors';
import { Customer } from '../../interfaces/customer.interface';
import { Spinner } from '../../../../shared/components/spinner/spinner';
import { DataLoaderError } from '../../../../shared/components/data-loader-error/data-loader-error';
import { customerActions } from '../../state/customer.actions';
import { PhoneValueModel } from '../../../../shared/components/phone-input/models/phone-value-model.interface';
import { CustomerService } from '../../services/customer.service';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { ToastModule } from 'primeng/toast';
import { CustomerInfo } from '../../interfaces/customer-info.interface';

@Component({
  selector: 'app-profile-page',
  imports: [ProfileHero, ProfileContact, ProfileInfo, ProfileAddress, ProfileDocument, Spinner, DataLoaderError, ToastModule],
  providers: [MessageService],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss',
})
export class ProfilePage implements OnInit {
  private store: Store = inject(Store);
  private customerService = inject(CustomerService);
  private messageService = inject(MessageService);
  private translateSevice = inject(TranslateService);
  customer = signal<Customer | null>(null);
  isLoading = signal(false);
  apiError = signal<ErrorModel | null>(null);
  hasApiError = computed(() => this.apiError() != null);

  isSubmitingPhone = signal(false);
  isSubmitingEmail = signal(false);
  isSubmitingInfo = signal(false);

  constructor() {}
  ngOnInit(): void {
    this.loadCustomer();
  }

  loadCustomer() {
    this.isLoading.set(true);
    this.store.select(selectIsCustomerLoading).subscribe((value) => this.isLoading.set(value));
    this.store.select(selectCustomerError).subscribe((value) => this.apiError.set(value));
    this.store.select(selectCustomer).subscribe((value) => this.customer.set(value));
  }

  handleEmailSubmit($event: { email: string }) {
    this.isSubmitingEmail.set(true);
    this.customerService.updateEmail({ emailAddress: $event.email }).subscribe({
      next: (value) => {
        this.store.dispatch(customerActions.updateCustomer({ customer: value }));
        this.messageService.add({
          summary: this.translateSevice.instant('toast.emailSaved.summary'),
          detail: this.translateSevice.instant('toast.emailSaved.message'),
          severity: 'success',
        });
        this.isSubmitingEmail.set(false);
      },
      error: (error: ErrorModel) => {
        this.messageService.add({
          summary: error.title,
          detail: error.message,
          severity: 'error',
        });
        this.isSubmitingEmail.set(false);
      },
    });
  }

  handlePhoneSubmit($event: { phoneNumber: PhoneValueModel }) {
    this.isSubmitingPhone.set(true);
    this.customerService.updatePhone({ phoneNumber: $event.phoneNumber.international }).subscribe({
      next: (value) => {
        this.store.dispatch(customerActions.updateCustomer({ customer: value }));
        this.messageService.add({
          summary: this.translateSevice.instant('toast.phoneSaved.summary'),
          detail: this.translateSevice.instant('toast.phoneSaved.message'),
          severity: 'success',
        });
        this.isSubmitingPhone.set(false);
      },
      error: (error: ErrorModel) => {
        this.messageService.add({
          summary: error.title,
          detail: error.message,
          severity: 'error',
        });
        this.isSubmitingPhone.set(false);
      },
    });
  }

  handleInfoSubmit($event: { info: CustomerInfo }) {
    this.isSubmitingInfo.set(true);
    this.customerService.updateInfo($event.info).subscribe({
      next: (value) => {
        this.messageService.add({
          summary: this.translateSevice.instant('toast.customerInfoSaved.summary'),
          detail: this.translateSevice.instant('toast.customerInfoSaved.message'),
          severity: 'success',
        });
        this.store.dispatch(customerActions.updateCustomer({ customer: value }));
        this.isSubmitingInfo.set(false);
      },
      error: (err: ErrorModel) => {
        this.messageService.add({
          summary: err.title,
          detail: err.message,
          severity: 'error',
        });
        this.isSubmitingInfo.set(false);
      },
    });
  }

  extractContact() {
    return {
      email: this.customer()?.emailAddress ?? '',
      phoneNumber: this.customer()?.phoneNumber ?? '',
    };
  }

  reloadPage() {
    this.store.dispatch(customerActions.loadCustomer());
  }
}
