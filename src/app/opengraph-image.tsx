import { getSiteData } from '@/data';
import { getDictionary } from '@/i18n';
import { ogContentType, ogSize, renderOgImage } from '@/lib/og';

const dict = getDictionary();

export const alt = dict.meta.siteTitle;
export const size = ogSize;
export const contentType = ogContentType;

/** Imagen OG por defecto (inicio, listados, CV). */
export default async function Image() {
  const { profile } = getSiteData();
  return renderOgImage({
    path: '',
    kicker: 'hola, soy',
    title: profile.name,
    description: `${profile.valueProp.before}${profile.valueProp.highlight}${profile.valueProp.after}`,
    tags: profile.headline.split(' · ').slice(1),
  });
}
