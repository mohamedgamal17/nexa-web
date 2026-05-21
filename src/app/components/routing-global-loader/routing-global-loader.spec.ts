import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoutingGlobalLoader } from './routing-global-loader';
import { RouterLoadingService } from '../../core/services/routing-loading.service';
import { createMockRouterLoadingService } from '../../../testing/test-providers';

describe('RoutingGlobalLoader', () => {
  let component: RoutingGlobalLoader;
  let fixture: ComponentFixture<RoutingGlobalLoader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutingGlobalLoader],
      providers: [
        {
          provide: RouterLoadingService,
          useValue: createMockRouterLoadingService('guards'),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RoutingGlobalLoader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return 30 progress when phase is guards', () => {
    expect(component.getCurrentProgress()).toBe(30);
  });

  it('should return 100 progress when phase is idle', () => {
    const idleService = createMockRouterLoadingService('idle');
    component.routerLoadingService = idleService as unknown as RouterLoadingService;
    expect(component.getCurrentProgress()).toBe(100);
  });
});
