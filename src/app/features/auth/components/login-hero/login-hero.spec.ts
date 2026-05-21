import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginHero } from './login-hero';

// Presentational shell — no component class API beyond instantiation.
describe('LoginHero', () => {
  let component: LoginHero;
  let fixture: ComponentFixture<LoginHero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginHero],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginHero);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
