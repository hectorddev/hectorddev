import { defaultLocale, type Locale } from '@/i18n';
import { cv } from './es/cv';
import { profile } from './es/profile';
import { stack } from './es/stack';

/** Datos de contenido por idioma. Para inglés, crea `data/en/*` y agrégalo aquí. */
const data = {
  es: { profile, stack, cv },
} satisfies Record<Locale, unknown>;

export function getSiteData(locale: Locale = defaultLocale) {
  return data[locale];
}
