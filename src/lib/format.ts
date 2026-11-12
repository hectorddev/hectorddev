import { defaultLocale, localeTags, type Locale } from '@/i18n';

/** "2026-11-12" → "12 de noviembre de 2026". Usa UTC para no correr el día. */
export function formatDate(isoDate: string, locale: Locale = defaultLocale): string {
  return new Intl.DateTimeFormat(localeTags[locale], {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${isoDate}T00:00:00Z`));
}

/** Fecha para RSS y metadatos (RFC 822 / ISO). */
export function toDate(isoDate: string): Date {
  return new Date(`${isoDate}T00:00:00Z`);
}
