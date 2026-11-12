import type { MetadataRoute } from 'next';
import { getAllPosts, getAllTags } from '@/lib/content/posts';
import { getAllProjects } from '@/lib/content/projects';
import { toDate } from '@/lib/format';
import { absoluteUrl } from '@/lib/site-url';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [allPosts, projects, tags] = await Promise.all([
    getAllPosts(),
    getAllProjects(),
    getAllTags(),
  ]);
  const posts = allPosts.filter((post) => !post.draft);
  const latestPost = posts[0];

  return [
    { url: absoluteUrl('/'), changeFrequency: 'monthly', priority: 1 },
    { url: absoluteUrl('/proyectos'), changeFrequency: 'monthly', priority: 0.9 },
    ...projects.map((project) => ({
      url: absoluteUrl(project.url),
      changeFrequency: 'yearly' as const,
      priority: 0.8,
    })),
    {
      url: absoluteUrl('/blog'),
      lastModified: latestPost ? toDate(latestPost.updated ?? latestPost.date) : undefined,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: absoluteUrl(post.url),
      lastModified: toDate(post.updated ?? post.date),
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
    ...(posts.length > 0
      ? tags.map((tag) => ({
          url: absoluteUrl(`/blog/tags/${tag.slug}`),
          changeFrequency: 'monthly' as const,
          priority: 0.4,
        }))
      : []),
    { url: absoluteUrl('/cv'), changeFrequency: 'monthly', priority: 0.7 },
  ];
}
