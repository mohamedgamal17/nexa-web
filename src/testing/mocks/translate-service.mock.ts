import { of } from "rxjs";
import {  vi } from 'vitest';

export const mockTranslateService = {
  get: vi.fn((key: string) => of(key)),
  instant: vi.fn((key: string) => key),
  use: vi.fn(() => of('en')),
  stream: vi.fn((key: string) => of(key)),
  onLangChange: of({ lang: 'en', translations: {} }),
  onTranslationChange: of(),
  onDefaultLangChange: of(),
  currentLang: 'en',
  defaultLang: 'en',
  setDefaultLang: vi.fn(),
};
