import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhoneInput } from './phone-input';
import { FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';

describe('PhoneInput', () => {
  let component: PhoneInput;
  let fixture: ComponentFixture<PhoneInput>;
  let onChange: (value: import('./models/phone-value-model.interface').PhoneValueModel | null) => void;

  beforeEach(async () => {
    const form = new FormGroup({});
    const formGroupDirective = new FormGroupDirective([], []);
    formGroupDirective.form = form;

    await TestBed.configureTestingModule({
      imports: [PhoneInput, ReactiveFormsModule],
      providers: [{ provide: FormGroupDirective, useValue: formGroupDirective }],
    }).compileComponents();

    fixture = TestBed.createComponent(PhoneInput);
    component = fixture.componentInstance;
    onChange = vi.fn() as (
      value: import('./models/phone-value-model.interface').PhoneValueModel | null,
    ) => void;
    component.registerOnChange(onChange);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should write value via ControlValueAccessor', () => {
    component.writeValue({
      countryCode: 'US',
      dialCode: '+1',
      number: '5551234567',
      international: '+15551234567',
    });
    expect(component.phoneNumber()).toBe('5551234567');
  });

  it('should call onChange when phone input changes', () => {
    component.onPhoneInput('5551234567');
    expect(onChange).toHaveBeenCalled();
  });

  it('should set disabled state', () => {
    component.setDisabledState?.(true);
    expect(component.isDisabled()).toBe(true);
  });
});
