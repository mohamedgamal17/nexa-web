import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ProfilePage } from './profile-page';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CustomerService } from '../../services/customer.service';
import { KycTokenService } from '../../services/kyc-token.service';
import { KycReviewService } from '../../services/kyc-reviews.service';
import { ComplyCubeService } from '../../../onboarding/services/comply-cube.service';
import { MessageService } from 'primeng/api';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import {
  defaultCustomerState,
  provideDefaultMockStoreState,
} from '../../../../../testing/test-providers';
import { CUSTOMER_KEY_FEAUTRE } from '../../state/customer.reducer';
import {
  selectCustomer,
  selectCustomerError,
  selectIsCustomerLoading,
} from '../../state/customer.selectors';

describe('ProfilePage', () => {
  let component: ProfilePage;
  let fixture: ComponentFixture<ProfilePage>;
  let store: MockStore;

  const mockCustomer = {
    id: '1',
    emailAddress: 'a@test.com',
    phoneNumber: '+1',
    info: { firstName: 'A', lastName: 'B' },
    address: { country: 'US', state: 'CA', city: 'LA', line1: '1 Main' },
    document: null,
    status: 1,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilePage, TranslateModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        provideMockStore({ initialState: provideDefaultMockStoreState() }),
        {
          provide: CustomerService,
          useValue: {
            updateEmail: vi.fn(() => of(mockCustomer)),
            updatePhone: vi.fn(() => of(mockCustomer)),
            updateInfo: vi.fn(() => of(mockCustomer)),
            updateAddress: vi.fn(() => of(mockCustomer)),
          },
        },
        { provide: KycTokenService, useValue: { getToken: vi.fn(() => of('token')) } },
        { provide: KycReviewService, useValue: {} },
        { provide: ComplyCubeService, useValue: {} },
        { provide: MessageService, useValue: { add: vi.fn() } },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    store.overrideSelector(selectCustomer, mockCustomer as never);
    store.overrideSelector(selectIsCustomerLoading, false);
    store.overrideSelector(selectCustomerError, null);
    store.refreshState();

    fixture = TestBed.createComponent(ProfilePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load customer from store on init', () => {
    component.ngOnInit();
    expect(component.customer()).toEqual(mockCustomer);
  });

  it('should toggle hasApiError when apiError is set', () => {
    component.apiError.set({ type: 'connection', title: 'Err', message: 'err' });
    expect(component.hasApiError()).toBe(true);
  });
});
