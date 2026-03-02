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

@Component({
  selector: 'app-profile-page',
  imports: [ProfileHero, ProfileContact, ProfileInfo, ProfileAddress, ProfileDocument, Spinner, DataLoaderError],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss',
})
export class ProfilePage implements OnInit {
  private store: Store = inject(Store);

  customer = signal<Customer | null>(null);
  isLoading = signal(false);
  apiError = signal<ErrorModel | null>(null);
  hasApiError = computed(() => this.apiError() != null);

  constructor() {
    effect(() => console.log(this.apiError()));
  }
  ngOnInit(): void {
    this.loadCustomer();
  }

  loadCustomer() {
    this.isLoading.set(true);
    this.store.select(selectIsCustomerLoading).subscribe((value) => this.isLoading.set(value));
    this.store.select(selectCustomerError).subscribe((value) => this.apiError.set(value));
    this.store.select(selectCustomer).subscribe((value) => this.customer.set(value));
  }

  reloadPage() {
    this.store.dispatch(customerActions.loadCustomer());
  }
}
