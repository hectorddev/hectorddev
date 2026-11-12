import type { MetadataRoute } from 'next';
import { defaultLocale, getDictionary } from '@/i18n';

export default function manifest(): MetadataRoute.Manifest {
  const dict = getDictionary();
  return {
    name: dict.meta.siteTitle,
    short_name: dict.meta.siteName,
    description: dict.meta.siteDescription,
    lang: defaultLocale,
    start_url: '/',
    display: 'browser',
    background_color: '#0b0d10',
    theme_color: '#0b0d10',
    icons: [
      { src: '/icon.svg', type: 'image/svg+xml', sizes: 'any' },
      { src: '/apple-icon', type: 'image/png', sizes: '180x180' },
    ],
  };
}
