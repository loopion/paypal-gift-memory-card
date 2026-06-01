import { en, type TranslationKeys } from './en';
import { fr } from './fr';
import type { Language, PDFLanguage } from '../types';

const translations = { en, fr } as const;

export function t(key: TranslationKeys, lang: Language | PDFLanguage): string {
  if (lang === 'both') {
    return `${en[key]} / ${fr[key]}`;
  }
  return translations[lang as Language]?.[key] ?? en[key];
}

export { en, fr };
export type { TranslationKeys };
