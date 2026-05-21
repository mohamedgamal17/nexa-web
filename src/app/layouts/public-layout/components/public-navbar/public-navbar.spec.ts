import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicNavbar } from './public-navbar';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import {
  mockAuthService,
  defaultCustomerState,
  provideDefaultMockStoreState,
} from '../../../../../testing/test-providers';
import { CustomerStatus } from '../../../../features/customers/enums/customer-status.enum';
import { CUSTOMER_KEY_FEAUTRE } from '../../../../features/customers/state/customer.reducer';

describe('PublicNavbar', () => {
  let component: PublicNavbar;
  let fixture: ComponentFixture<PublicNavbar>;
  let authService: typeof mockAuthService;
  let store: MockStore;

  const routerMock = {
    navigate: vi.fn(),
    navigateByUrl: vi.fn(),
    url: '/',
    events: of(),
    createUrlTree: vi.fn(),
    serializeUrl: vi.fn(),
  };

  beforeEach(async () => {
    authService = { ...mockAuthService, logout: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [PublicNavbar, TranslateModule.forRoot()],
      providers: [
        { provide: Router, useValue: routerMock },
        provideMockStore({ initialState: provideDefaultMockStoreState() }),
        { provide: AuthService, useValue: authService },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(PublicNavbar);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call authService.logout on logout', () => {
    component.logout();
    expect(authService.logout).toHaveBeenCalled();
  });

  it('should return verified status when customer is verified', () => {
    store.setState({
      [CUSTOMER_KEY_FEAUTRE]: {
        ...defaultCustomerState,
        customer: { status: CustomerStatus.Verified } as never,
        loaded: true,
      },
    });
    store.refreshState();
    expect(component.getCustomerStatus()).toBe('verified');
  });

  it('should show logo on root url', () => {
    expect(component.showLogo()).toBe(true);
  });
});
