import { cache } from 'react';
import { defaultLocale, type Locale } from '@/i18n';
import { assertPublicFileExists, readCollection, validateFrontmatter } from './files';
import { projectFrontmatterSchema, type ProjectFrontmatter } from './schemas';

export type Project = ProjectFrontmatter & {
  slug: string;
  locale: Locale;
  url: string;
};

const loadProjects = cache(async (locale: Locale): Promise<Project[]> => {
  const entries = await readCollection(locale, 'proyectos');

  const projects = await Promise.all(
    entries.map(async (entry) => {
      const data = validateFrontmatter(projectFrontmatterSchema, entry);
      if (data.cover) await assertPublicFileExists(data.cover, entry.file);
      return {
        ...data,
        slug: entry.slug,
        locale,
        url: `/proyectos/${entry.slug}`,
      } satisfies Project;
    }),
  );

  return projects.sort(
    (a, b) =>
      (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER) ||
      a.title.localeCompare(b.title),
  );
});

export async function getAllProjects(locale: Locale = defaultLocale): Promise<Project[]> {
  return loadProjects(locale);
}

export async function getFeaturedProjects(locale: Locale = defaultLocale): Promise<Project[]> {
  const projects = await loadProjects(locale);
  return projects.filter((project) => project.featured);
}

export async function getProject(slug: string, locale: Locale = defaultLocale) {
  const projects = await loadProjects(locale);
  return projects.find((project) => project.slug === slug);
}
