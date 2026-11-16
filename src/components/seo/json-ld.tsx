import { siteConfig } from '@/config/site';
import { getSiteData } from '@/data';
import { getDictionary } from '@/i18n';
import type { Post } from '@/lib/content/posts';
import { absoluteUrl } from '@/lib/site-url';

type JsonLdData = Record<string, unknown>;

/** Datos estructurados schema.org (ayudan a los buscadores a entender la página). */
export function JsonLd({ data }: { data: JsonLdData }) {
  return (
    <script
      type="application/ld+json"
      // Escapa "<" para que el contenido no pueda cerrar la etiqueta <script>.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}

export function personSchema(): JsonLdData {
  const { profile, stack } = getSiteData();
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.role,
    url: absoluteUrl('/'),
    email: `mailto:${siteConfig.email}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'San Cristóbal',
      addressCountry: 'VE',
    },
    sameAs: [siteConfig.links.github, siteConfig.links.linkedin],
    knowsAbout: stack.flatMap((group) => group.items),
  };
}

export function blogPostingSchema(post: Post): JsonLdData {
  const dict = getDictionary(post.locale);
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    inLanguage: post.locale,
    keywords: post.tags.join(', '),
    url: absoluteUrl(post.url),
    mainEntityOfPage: absoluteUrl(post.url),
    author: { '@type': 'Person', name: dict.meta.siteName, url: absoluteUrl('/') },
  };
}
