import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileContact } from './profile-contact';
import { parsePhoneNumber } from '../../../../shared/utils/phone-number.utils';
import { TranslateModule } from '@ngx-translate/core';

describe('ProfileContact', () => {
  let component: ProfileContact;
  let fixture: ComponentFixture<ProfileContact>;

  const inputContact = {
    email: 'simple@test.com',
    phoneNumber: '+150134551003',
  };
  const fakeCountact = {
    email: 'example@test.com',
    phoneNumber: '+15056441003',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileContact, TranslateModule.forRoot({})],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileContact);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit email submited event when handle email submit is called', () => {
    const spyOnEmailSubmited = vi.spyOn(component.emailSubmited, 'emit');

    component.emailForm.patchValue({
      email: fakeCountact.email,
    });

    component.handleEmailSumbit(new Event('submit') as any);

    expect(spyOnEmailSubmited).toHaveBeenCalledOnce();
  });

  it('should emit phone number submited event when handle phone sumbit is called', () => {
    const spyOnPhoneSubmited = vi.spyOn(component.phoneSubmited, 'emit');

    component.phoneForm.patchValue({
      phoneNumber: parsePhoneNumber(fakeCountact.phoneNumber),
    });

    component.handlePhoneSubmit(new Event('submit') as any);

    expect(spyOnPhoneSubmited).toHaveBeenCalledOnce();
  });

  it('should toggle edit email value when toggled edit email is called', () => {
    const currentEditvalue = component.editEmail();

    component.toggleEditEmail();

    expect(component.editEmail()).toBe(!currentEditvalue);
  });

  it('should toggle edit phone value when toggled edit phone is called', () => {
    const currentEditvalue = component.editPhone();

    component.toggleEditPhone();

    expect(component.editPhone()).toBe(!currentEditvalue);
  });

  it('should not emit email submited whene email form value is same as input value', () => {
    const spyOnEmailSubmited = vi.spyOn(component.emailSubmited, 'emit');

    fixture.componentRef.setInput('contact', inputContact);

    component.handleEmailSumbit(new Event('submit') as any);

    expect(spyOnEmailSubmited).not.toHaveBeenCalled();
  });

    it('should not emit phone submited whene phone form value is same as input value', () => {
    const spyOnEmailSubmited = vi.spyOn(component.phoneSubmited, 'emit');

    fixture.componentRef.setInput('contact', inputContact);

    component.handlePhoneSubmit(new Event('submit') as any);

    expect(spyOnEmailSubmited).not.toHaveBeenCalled();
  });
});
