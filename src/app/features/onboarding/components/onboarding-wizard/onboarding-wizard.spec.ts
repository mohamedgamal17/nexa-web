import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OnboardingWizard } from './onboarding-wizard';
import { Gender } from '../../../customers/enums/gender.enum';
import { TranslateModule } from '@ngx-translate/core';


describe('OnboardingWizard', () => {
  let component: OnboardingWizard;
  let fixture: ComponentFixture<OnboardingWizard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnboardingWizard, TranslateModule.forRoot({})],
    }).compileComponents();

    fixture = TestBed.createComponent(OnboardingWizard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit email submited event when handle email submit is called', () => {
    const spyOnEmailSubmited = vi.spyOn(component.emailSubmited, 'emit');

    component.handleEmailSubmit({ email: 'example@test.com' });

    expect(spyOnEmailSubmited).toHaveBeenCalledOnce();
  });

  it('should emit phone submited event when handle phone submit is called', () => {
    const spyOnPhoneSubmited = vi.spyOn(component.phoneSubmited, 'emit');

    component.handlePhoneSubmit({
      phone: {
        countryCode: 'US',
        dialCode: '1',
        number: '5703108015',
        international: '+15703108015',
      },
    });

    expect(spyOnPhoneSubmited).toHaveBeenCalledOnce();
  });

  it('should emit info submited event when handle info submited is called', () => {
    const spyOnInfoSubmited = vi.spyOn(component.infoSubmited, 'emit');

    component.handleInfoSumbit({
      info: {
        firstName: 'jhon',
        lastName: 'doe',
        gender: Gender.Male,
        birthDate: '23/10/2001',
      },
    });

    expect(spyOnInfoSubmited).toHaveBeenCalledOnce();
  });

  it('should emit address submited event when handle address submited is called', () => {
    const spyOnAddressSubmited = vi.spyOn(component.addressSubmited, 'emit');
    component.handleAddressSubmit({
      address: {
        country: 'US',
        state: 'CA',
        city: 'Arizona',
        streetLine: '31 Arizona street',
        postalCode: '44514',
        zipCode: '45144',
      },
    });
    expect(spyOnAddressSubmited).toHaveBeenCalledOnce()
  });

  it('should emit kyc sumbited event when handle kyc sumbit is called', ()=>{
    const spyOnKycSubmited = vi.spyOn(component.kycSybmited,'emit')
    component.handleKycSubmit()
    expect(spyOnKycSubmited).toHaveBeenCalledOnce()
  })
});

