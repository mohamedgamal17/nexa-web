import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAddress } from './profile-address';
import { Address } from '../../interfaces/address.interface';
import { COUNTRIES } from '../../../../core/constants/countries.data';
import { getStatesByCountry } from '../../../../core/constants/states.data';
import { TranslateModule } from '@ngx-translate/core';

describe('ProfileAddress', () => {
  let component: ProfileAddress;
  let fixture: ComponentFixture<ProfileAddress>;

  const inputAddress: Address = {
    country: 'US',
    state: 'CA',
    city: 'Los Angeles',
    streetLine: '123 Sunset Blvd',
    postalCode: '90001',
    zipCode: '90001',
  };

  const formAddress: Address = {
    country: 'US',
    state: 'NY',
    city: 'New York',
    streetLine: '456 Madison Ave',
    postalCode: '10001',
    zipCode: '10001',
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileAddress, TranslateModule.forRoot({})],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileAddress);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle edit address when toggled edit address is called', () => {
    const currentEditAddress = component.editAddress();

    component.toggleEditAddress();

    expect(component.editAddress()).toBe(!currentEditAddress);
  });

  it('should emit submited event when handle submit is called', () => {
    const spyOnSubmited = vi.spyOn(component.submited, 'emit');

    component.addressForm.patchValue({
      ...formAddress,
    });

    console.log(component.addressForm.value)

    component.handleSubmit(new Event('submit') as any);

    expect(spyOnSubmited).toHaveBeenCalledOnce();
  });

  it('should set selected country value when handle country change is called', () => {
    const selectedCountry = COUNTRIES[0];

    component.handleCountryChange(selectedCountry.code);

    expect(component.currentSelectedCountry).toBeTruthy();
    expect(component.currentSelectedCountry()).toBe(selectedCountry.code);
  });

  it('should set current country filter state according to current selected coutnry', () => {
    const selectedCountry = COUNTRIES[0];
    const expectedStateLength = getStatesByCountry(selectedCountry.code)
    component.handleCountryChange(selectedCountry.code);

    expect(component.states()).toBe(expectedStateLength)
  });

  it('should not emit the submit event if the form address same as input address', ()=>{

    const spyonSubmited = vi.spyOn(component.submited, 'emit')

    fixture.componentRef.setInput("address", inputAddress)

    component.handleSubmit(new Event('submit') as any)

    expect(spyonSubmited).not.toHaveBeenCalled()
  })
});
