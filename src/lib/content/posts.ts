import { slug as slugify } from 'github-slugger';
import { cache } from 'react';
import { defaultLocale, type Locale } from '@/i18n';
import { isProductionDeployment } from '@/lib/site-url';
import { readCollection, validateFrontmatter } from './files';
import { extractHeadings, readingMinutes, type Heading } from './markdown';
import { postFrontmatterSchema, type PostFrontmatter } from './schemas';

export type Post = PostFrontmatter & {
  slug: string;
  locale: Locale;
  url: string;
  readingMinutes: number;
  headings: Heading[];
};

export type TagSummary = { tag: string; slug: string; count: number };

/** Mínimo de títulos h2 para mostrar la tabla de contenidos. */
export const TOC_MIN_SECTIONS = 3;

/**
 * Borradores: visibles en `next dev` y en los Preview de Vercel,
 * ocultos en producción.
 */
export const includeDrafts = !isProductionDeployment;

const loadPosts = cache(async (locale: Locale): Promise<Post[]> => {
  const entries = await readCollection(locale, 'blog');

  const posts = entries.map((entry) => {
    const data = validateFrontmatter(postFrontmatterSchema, entry);
    return {
      ...data,
      slug: entry.slug,
      locale,
      url: `/blog/${entry.slug}`,
      readingMinutes: readingMinutes(entry.body),
      headings: extractHeadings(entry.body),
    } satisfies Post;
  });

  return posts
    .filter((post) => includeDrafts || !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
});

/** Artículos visibles, del más reciente al más antiguo. */
export async function getAllPosts(locale: Locale = defaultLocale): Promise<Post[]> {
  return loadPosts(locale);
}

export async function getPost(slug: string, locale: Locale = defaultLocale) {
  const posts = await loadPosts(locale);
  return posts.find((post) => post.slug === slug);
}

/** Artículo anterior (más antiguo) y siguiente (más reciente). */
export async function getAdjacentPosts(slug: string, locale: Locale = defaultLocale) {
  const posts = await loadPosts(locale);
  const index = posts.findIndex((post) => post.slug === slug);
  return {
    previous: index >= 0 ? posts[index + 1] : undefined,
    next: index > 0 ? posts[index - 1] : undefined,
  };
}

export function tagSlug(tag: string): string {
  return slugify(tag);
}

export async function getAllTags(locale: Locale = defaultLocale): Promise<TagSummary[]> {
  const posts = await loadPosts(locale);
  const counts = new Map<string, TagSummary>();

  for (const post of posts) {
    for (const tag of post.tags) {
      const key = tagSlug(tag);
      const current = counts.get(key);
      counts.set(key, { tag: current?.tag ?? tag, slug: key, count: (current?.count ?? 0) + 1 });
    }
  }

  return [...counts.values()].sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export async function getPostsByTag(slug: string, locale: Locale = defaultLocale) {
  const posts = await loadPosts(locale);
  return posts.filter((post) => post.tags.some((tag) => tagSlug(tag) === slug));
}
