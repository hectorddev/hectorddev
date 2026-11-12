import type { Metadata } from 'next';
import { defaultLocale, getDictionary, ogLocales, type Locale } from '@/i18n';

type PageMetadataInput = {
  title: string;
  description: string;
  /** Ruta canónica, p. ej. `/blog/mi-articulo`. */
  path: string;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  noindex?: boolean;
  /** Usa el título tal cual, sin la plantilla "· Hector Márquez". */
  absoluteTitle?: boolean;
  locale?: Locale;
};

/**
 * Metadatos completos de una página: title, description, canonical,
 * Open Graph y Twitter. Las imágenes OG salen de los archivos
 * `opengraph-image.tsx` de cada segmento.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = 'website',
  publishedTime,
  modifiedTime,
  tags,
  noindex,
  absoluteTitle,
  locale = defaultLocale,
}: PageMetadataInput): Metadata {
  const dict = getDictionary(locale);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      title,
      description,
      siteName: dict.meta.siteName,
      locale: ogLocales[locale],
      ...(type === 'article'
        ? {
            publishedTime: publishedTime ? `${publishedTime}T00:00:00Z` : undefined,
            modifiedTime: modifiedTime ? `${modifiedTime}T00:00:00Z` : undefined,
            authors: [dict.meta.siteName],
            tags,
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
