import { AbstractControl, ValidatorFn } from "@angular/forms";

export class AddressValidators {


  static cityName(): ValidatorFn {
    return (control : AbstractControl) => {
      if (!control.value) return null;
      const valid = /^[a-zA-ZÀ-ÿĀ-žḀ-ỿ\s\-'.]+$/.test(control.value.trim());
      return valid ? null : { invalidCityName: true };
    };
  }

  /**
   * International postal code: alphanumeric, spaces, hyphens — 2‑10 chars.
   * Covers formats like "SW1A 1AA", "10115", "M5V 2T6", "2000".
   */
  static postalCode(): ValidatorFn {
    return (control  : AbstractControl)  => {
      if (!control.value) return null;
      const valid = /^[A-Za-z0-9][A-Za-z0-9\s\-]{1,9}$/.test(control.value.trim());
      return valid ? null : { invalidPostalCode: true };
    };
  }

  /**
   * US ZIP code — 5 digits, optionally followed by +4 (e.g. 90210 or 90210-1234).
   */
  static zipCode(): ValidatorFn {
    return (control: AbstractControl) => {
      if (!control.value) return null;
      const valid = /^\d{5}(-\d{4})?$/.test(control.value.trim());
      return valid ? null : { invalidZipCode: true };
    };
  }

 
  static noWhitespaceOnly(): ValidatorFn {
    return (control: AbstractControl) => {
      if (!control.value) return null;
      return control.value.trim().length > 0 ? null : { whitespace: true };
    };
  }
}