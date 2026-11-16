import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '../../../../../keystatic.config';

/**
 * Autenticación con GitHub y operaciones del panel de contenido.
 *
 * En modo GitHub, Keystatic exige KEYSTATIC_GITHUB_CLIENT_ID,
 * KEYSTATIC_GITHUB_CLIENT_SECRET y KEYSTATIC_SECRET. Mientras no estén
 * configuradas (ver docs/SITE.md), la ruta responde 503 en lugar de romper
 * el build del sitio.
 */
const isConfigured =
  config.storage.kind === 'local' ||
  Boolean(
    process.env.KEYSTATIC_GITHUB_CLIENT_ID &&
    process.env.KEYSTATIC_GITHUB_CLIENT_SECRET &&
    process.env.KEYSTATIC_SECRET,
  );

const handler = isConfigured ? makeRouteHandler({ config }) : null;

function notConfigured() {
  return new Response('El panel de contenido aún no está configurado. Ver docs/SITE.md.', {
    status: 503,
  });
}

export function GET(request: Request) {
  return handler ? handler.GET(request) : notConfigured();
}

export function POST(request: Request) {
  return handler ? handler.POST(request) : notConfigured();
}
