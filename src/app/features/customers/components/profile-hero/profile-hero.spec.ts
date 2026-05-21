import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileHero } from './profile-hero';
import { CustomerStatus } from '../../enums/customer-status.enum';

describe('ProfileHero', () => {
  let component: ProfileHero;
  let fixture: ComponentFixture<ProfileHero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileHero],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileHero);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('customer', {
      status: CustomerStatus.Unverified,
      info: { firstName: 'John', lastName: 'Doe' },
    } as never);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return Unverified account status for unverified customer', () => {
    expect(component.getAccountStatus()).toBe('Unverified');
  });

  it('should return warning badge class for unverified customer', () => {
    expect(component.getBadgeStateClass()).toContain('warning');
  });

  it('should return Verified account status for verified customer', () => {
    fixture.componentRef.setInput('customer', {
      status: CustomerStatus.Verified,
      info: { firstName: 'Jane', lastName: 'Doe' },
    } as never);
    expect(component.getAccountStatus()).toBe('Verified');
  });
});
