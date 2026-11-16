import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogIndex } from '@/components/blog/blog-index';
import { getDictionary } from '@/i18n';
import { getAllTags, getPostsByTag } from '@/lib/content/posts';
import { pageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ tag: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((tag) => ({ tag: tag.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const summary = (await getAllTags()).find((item) => item.slug === tag);
  if (!summary) return {};
  const dict = getDictionary();
  return pageMetadata({
    title: dict.blog.tagTitle(summary.tag),
    description: dict.blog.tagDescription(summary.tag),
    path: `/blog/tags/${summary.slug}`,
  });
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const [tags, posts] = await Promise.all([getAllTags(), getPostsByTag(tag)]);
  const summary = tags.find((item) => item.slug === tag);
  if (!summary) notFound();

  const dict = getDictionary();

  return (
    <BlogIndex
      title={dict.blog.tagTitle(summary.tag)}
      label={`ls ./blog --tag=${summary.slug}`}
      intro={dict.blog.intro}
      posts={posts}
      tags={tags}
      activeTag={summary.slug}
    />
  );
}
