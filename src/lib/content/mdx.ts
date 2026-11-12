import type { MDXContent } from 'mdx/types';
import type { Locale } from '@/i18n';
import type { Collection } from './files';

/**
 * Importa el componente compilado de un MDX. @next/mdx lo compila en build
 * (remark/rehype configurados en next.config.ts), así que el contenido
 * llega como HTML estático sin JavaScript extra.
 */
export async function loadMdx(
  collection: Collection,
  locale: Locale,
  slug: string,
): Promise<MDXContent> {
  const mod = (await import(`@content/${locale}/${collection}/${slug}.mdx`)) as {
    default: MDXContent;
  };
  return mod.default;
}
