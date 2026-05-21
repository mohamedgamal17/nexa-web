import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { RouterLoadingService } from './core/services/routing-loading.service';
import { createMockRouterLoadingService } from '../testing/test-providers';

describe('App', () => {
  let component: App;
  let fixture: ComponentFixture<App>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        {
          provide: RouterLoadingService,
          useValue: createMockRouterLoadingService(),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject RouterLoadingService', () => {
    expect(component.routerLoadingService).toBeTruthy();
  });
});
