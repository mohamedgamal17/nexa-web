import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login-page';
import { AuthService } from '@auth0/auth0-angular';
import { NEVER } from 'rxjs';
import { mockAuthService } from '../../../../../testing/test-providers';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let authService: typeof mockAuthService;

  beforeEach(async () => {
    authService = {
      ...mockAuthService,
      loginWithRedirect: vi.fn(() => NEVER),
    };

    await TestBed.configureTestingModule({
      imports: [LoginPage],
      providers: [{ provide: AuthService, useValue: authService }],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set loginLoading and call loginWithRedirect on handleLogin', () => {
    component.handleLogin();
    expect(component.loginLoading()).toBe(true);
    expect(authService.loginWithRedirect).toHaveBeenCalled();
  });
});
