import { PhoneValueModel } from '../components/phone-input/models/phone-value-model.interface';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

export function parsePhoneNumber(input: string): PhoneValueModel | null {
  const phone = parsePhoneNumberFromString(input);
  if (!phone || !phone.isValid()) {
    return null;
  }

  return {
    countryCode: phone.country ?? '',
    dialCode: `+${phone.countryCallingCode}`,
    number: phone.nationalNumber,
    international: phone.formatInternational(),
  };
}
