import { Country } from "../models/country.interface";

// Helper: convert ISO code to emoji flag
function isoToFlag(iso: string): string {
  return [...iso.toUpperCase()]
    .map(c => String.fromCodePoint(0x1f1e6 - 65 + c.charCodeAt(0)))
    .join('');
}

export const COUNTRIES: Country[] = [
  { name: 'United States', code: 'US', dialCode: '+1', flag: isoToFlag('US'), mask: '(999) 999-9999' },
  { name: 'United Kingdom', code: 'GB', dialCode: '+44', flag: isoToFlag('GB'), mask: '9999 999 9999' },
  { name: 'Germany', code: 'DE', dialCode: '+49', flag: isoToFlag('DE'), mask: '999 99999999' },
  { name: 'France', code: 'FR', dialCode: '+33', flag: isoToFlag('FR'), mask: '9 99 99 99 99' },
  { name: 'India', code: 'IN', dialCode: '+91', flag: isoToFlag('IN'), mask: '99999 99999' },
  { name: 'China', code: 'CN', dialCode: '+86', flag: isoToFlag('CN'), mask: '999 9999 9999' },
  { name: 'Japan', code: 'JP', dialCode: '+81', flag: isoToFlag('JP'), mask: '99-9999-9999' },
  { name: 'Brazil', code: 'BR', dialCode: '+55', flag: isoToFlag('BR'), mask: '(99) 99999-9999' },
  { name: 'Australia', code: 'AU', dialCode: '+61', flag: isoToFlag('AU'), mask: '9999 999 999' },
  { name: 'Canada', code: 'CA', dialCode: '+1', flag: isoToFlag('CA'), mask: '(999) 999-9999' },
  { name: 'Italy', code: 'IT', dialCode: '+39', flag: isoToFlag('IT'), mask: '999 999 9999' },
  { name: 'Spain', code: 'ES', dialCode: '+34', flag: isoToFlag('ES'), mask: '999 999 999' },
  { name: 'Mexico', code: 'MX', dialCode: '+52', flag: isoToFlag('MX'), mask: '999 999 9999' },
  { name: 'South Korea', code: 'KR', dialCode: '+82', flag: isoToFlag('KR'), mask: '99-9999-9999' },
  { name: 'Russia', code: 'RU', dialCode: '+7', flag: isoToFlag('RU'), mask: '(999) 999-99-99' },
  { name: 'Netherlands', code: 'NL', dialCode: '+31', flag: isoToFlag('NL'), mask: '99 99999999' },
  { name: 'Turkey', code: 'TR', dialCode: '+90', flag: isoToFlag('TR'), mask: '(999) 999 9999' },
  { name: 'Saudi Arabia', code: 'SA', dialCode: '+966', flag: isoToFlag('SA'), mask: '99 999 9999' },
  { name: 'United Arab Emirates', code: 'AE', dialCode: '+971', flag: isoToFlag('AE'), mask: '99 999 9999' },
  { name: 'South Africa', code: 'ZA', dialCode: '+27', flag: isoToFlag('ZA'), mask: '99 999 9999' },
  { name: 'Egypt', code: 'EG', dialCode: '+20', flag: isoToFlag('EG'), mask: '999 999 9999' },
  { name: 'Nigeria', code: 'NG', dialCode: '+234', flag: isoToFlag('NG'), mask: '999 999 9999' },
  { name: 'Argentina', code: 'AR', dialCode: '+54', flag: isoToFlag('AR'), mask: '99 9999-9999' },
  { name: 'Pakistan', code: 'PK', dialCode: '+92', flag: isoToFlag('PK'), mask: '999 9999999' },
  { name: 'Indonesia', code: 'ID', dialCode: '+62', flag: isoToFlag('ID'), mask: '999-9999-9999' },
  { name: 'Sweden', code: 'SE', dialCode: '+46', flag: isoToFlag('SE'), mask: '99-999 99 99' },
  { name: 'Switzerland', code: 'CH', dialCode: '+41', flag: isoToFlag('CH'), mask: '99 999 99 99' },
  { name: 'Poland', code: 'PL', dialCode: '+48', flag: isoToFlag('PL'), mask: '999 999 999' },
  { name: 'Portugal', code: 'PT', dialCode: '+351', flag: isoToFlag('PT'), mask: '999 999 999' },
  { name: 'Ireland', code: 'IE', dialCode: '+353', flag: isoToFlag('IE'), mask: '99 999 9999' },
];