import { defaultLocale, type Locale } from './config';
import { es, type Dictionary } from './dictionaries/es';

const dictionaries: Record<Locale, Dictionary> = { es };

export function getDictionary(locale: Locale = defaultLocale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
export * from './config';
