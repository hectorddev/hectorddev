import type { MetadataRoute } from 'next';
import { absoluteUrl, isProductionDeployment } from '@/lib/site-url';

/** En Preview de Vercel no se indexa nada; en producción, todo. */
export default function robots(): MetadataRoute.Robots {
  if (!isProductionDeployment) {
    return { rules: { userAgent: '*', disallow: '/' } };
  }

  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
