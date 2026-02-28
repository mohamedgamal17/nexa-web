
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { PhoneValueModel } from '../models/phone-value-model.interface';
import { PhoneNumberType, PhoneNumberUtil } from 'google-libphonenumber';

export class PhoneNumberValidators {
  static phoneRequired(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value: PhoneValueModel = control.value;

      if (!value || !value.countryCode || !value.number) {
        return { phoneRequired: 'Country and phone number are required.' };
      }

      return null;
    };
  }

  static phoneValid(): ValidatorFn {
    const phoneUtil = PhoneNumberUtil.getInstance();

    return (control: AbstractControl): ValidationErrors | null => {
      const value: PhoneValueModel = control.value;

      if (!value?.number || !value?.countryCode) return null;

      const digits = value.number.replace(/\D/g, '');
      if (!digits) return null;

      try {
        const parsed = phoneUtil.parse(digits, value.countryCode);
        const isValid = phoneUtil.isValidNumberForRegion(parsed, value.countryCode);

        if (!isValid) {
          const isPossible = phoneUtil.isPossibleNumber(parsed);
          return {
            phoneInvalid: true
          };
        }

        return null;
      } catch (error: any) {
        return {
          phoneInvalid: {
            phoneInvalid: true
          },
        };
      }
    };
  }

  static phoneType(allowedTypes: string[]): ValidatorFn {
    const phoneUtil = PhoneNumberUtil.getInstance();

    return (control: AbstractControl): ValidationErrors | null => {
      const value: PhoneValueModel = control.value;

      if (!value?.number || !value?.countryCode) return null;

      const digits = value.number.replace(/\D/g, '');
      if (!digits) return null;

      try {
        const parsed = phoneUtil.parse(digits, value.countryCode);

        if (!phoneUtil.isValidNumberForRegion(parsed, value.countryCode)) {
          return null; 
        }

        const type = this.mapNumberType(phoneUtil.getNumberType(parsed));

        if (!allowedTypes.includes(type)) {
          return {
            phoneType: {
              expected: allowedTypes,
              actual: type
            },
          };
        }

        return null;
      } catch {
        return null;
      }
    };
  }

  static phoneMinLength(min: number = 7): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value: PhoneValueModel = control.value;
      if (!value?.number) return null;

      const digits = value.number.replace(/\D/g, '');

      if (digits.length > 0 && digits.length < min) {
        return {
          phoneMinLength: {
            required: min,
            actual: digits.length,
            message: `Phone number must be at least ${min} digits.`,
          },
        };
      }

      return null;
    };
  }

  static phoneMaxLength(max: number = 15): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value: PhoneValueModel = control.value;
      if (!value?.number) return null;

      const digits = value.number.replace(/\D/g, '');

      if (digits.length > max) {
        return {
          phoneMaxLength: {
            required: max,
            actual: digits.length,
          },
        };
      }

      return null;
    };
  }


  static mapNumberType(type: PhoneNumberType): string {
    const map: Record<number, string> = {
      [PhoneNumberType.FIXED_LINE]: 'Fixed Line',
      [PhoneNumberType.MOBILE]: 'Mobile',
      [PhoneNumberType.FIXED_LINE_OR_MOBILE]: 'Fixed Line or Mobile',
      [PhoneNumberType.TOLL_FREE]: 'Toll Free',
      [PhoneNumberType.PREMIUM_RATE]: 'Premium Rate',
      [PhoneNumberType.SHARED_COST]: 'Shared Cost',
      [PhoneNumberType.VOIP]: 'VoIP',
      [PhoneNumberType.PERSONAL_NUMBER]: 'Personal',
      [PhoneNumberType.PAGER]: 'Pager',
      [PhoneNumberType.UAN]: 'UAN',
      [PhoneNumberType.VOICEMAIL]: 'Voicemail',
      [PhoneNumberType.UNKNOWN]: 'Unknown',
    };
    return map[type] ?? 'Unknown';
  }
}

