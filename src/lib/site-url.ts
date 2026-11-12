/**
 * URL absoluta del sitio.
 * 1. NEXT_PUBLIC_SITE_URL (define tu dominio propio aquí cuando lo conectes)
 * 2. Dominio de producción que Vercel asigna al proyecto
 * 3. localhost en desarrollo
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, '');

  const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelProduction) return `https://${vercelProduction}`;

  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const siteUrl = resolveSiteUrl();

export function absoluteUrl(path = '/'): string {
  return new URL(path, siteUrl).toString();
}

/** true solo en el despliegue de producción de Vercel (o build local de producción). */
export const isProductionDeployment =
  process.env.VERCEL_ENV === 'production' ||
  (process.env.VERCEL_ENV === undefined && process.env.NODE_ENV === 'production');
