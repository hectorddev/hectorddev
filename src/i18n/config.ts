export const locales = ['es'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'es';

/** Etiqueta BCP 47 para fechas y números. */
export const localeTags: Record<Locale, string> = {
  es: 'es-VE',
};

/** Valor de og:locale. */
export const ogLocales: Record<Locale, string> = {
  es: 'es_VE',
};
