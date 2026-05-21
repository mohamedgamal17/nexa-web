import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, signal } from '@angular/core';
import { OnboardingPage } from './onboarding-page';
import { OnboardCustomerService } from '../../services/onboard-customer.service';
import { OnboardingStepStateService } from '../../services/onboarding-step-state.service';
import { CustomerService } from '../../../customers/services/customer.service';
import { KycTokenService } from '../../../customers/services/kyc-token.service';
import { KycReviewService } from '../../../customers/services/kyc-reviews.service';
import { ComplyCubeService } from '../../services/comply-cube.service';
import { MessageService } from 'primeng/api';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { provideDefaultMockStoreState } from '../../../../../testing/test-providers';
import { OnboardingStepState } from '../../enums/onboarding-state.enum';

describe('OnboardingPage', () => {
  let component: OnboardingPage;
  let fixture: ComponentFixture<OnboardingPage>;
  let onboardService: { getOrCreateOnboardCustomer: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    onboardService = {
      getOrCreateOnboardCustomer: vi.fn(() =>
        of({
          email: 'test@test.com',
          phoneNumber: '+123',
          step: 0,
        }),
      ),
    };

    await TestBed.configureTestingModule({
      imports: [OnboardingPage, TranslateModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        provideMockStore({ initialState: provideDefaultMockStoreState() }),
        { provide: OnboardCustomerService, useValue: onboardService },
        {
          provide: OnboardingStepStateService,
          useValue: {
            currentState: signal(OnboardingStepState.Email),
            currentStepNumber: signal(1),
            getTotalSteps: () => 4,
            extractStepState: vi.fn(),
            update: vi.fn(),
          },
        },
        { provide: CustomerService, useValue: {} },
        { provide: KycTokenService, useValue: {} },
        { provide: KycReviewService, useValue: {} },
        { provide: ComplyCubeService, useValue: {} },
        { provide: MessageService, useValue: { add: vi.fn() } },
        { provide: Router, useValue: { navigateByUrl: vi.fn() } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OnboardingPage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load onboard customer on init', () => {
    component.ngOnInit();
    expect(onboardService.getOrCreateOnboardCustomer).toHaveBeenCalled();
  });

  it('should set onboardCustomer after successful load', () => {
    component.ngOnInit();
    expect(component.onboardCustomer()?.email).toBe('test@test.com');
  });
});
