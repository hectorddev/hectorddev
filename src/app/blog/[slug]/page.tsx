import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PostMeta } from '@/components/blog/post-meta';
import { PostNav } from '@/components/blog/post-nav';
import { TableOfContents, TocList } from '@/components/blog/table-of-contents';
import { ArrowLeftIcon } from '@/components/icons';
import { Container } from '@/components/ui/container';
import { Tag } from '@/components/ui/tag';
import { getDictionary } from '@/i18n';
import { loadMdx } from '@/lib/content/mdx';
import {
  getAdjacentPosts,
  getAllPosts,
  getPost,
  tagSlug,
  TOC_MIN_SECTIONS,
} from '@/lib/content/posts';
import { formatDate } from '@/lib/format';
import { pageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.description,
    path: post.url,
    type: 'article',
    publishedTime: post.date,
    modifiedTime: post.updated,
    tags: post.tags,
    noindex: post.draft,
  });
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const dict = getDictionary(post.locale);
  const [Content, { previous, next }] = await Promise.all([
    loadMdx('blog', post.locale, post.slug),
    getAdjacentPosts(post.slug, post.locale),
  ]);

  const sections = post.headings.filter((heading) => heading.level === 2).length;
  const showToc = sections >= TOC_MIN_SECTIONS;

  return (
    <Container className="py-12 sm:py-16">
      <Link
        href="/blog"
        className="inline-flex min-h-11 items-center gap-2 font-mono text-sm text-muted transition-colors hover:text-accent-fg"
      >
        <ArrowLeftIcon aria-hidden="true" />
        {dict.blog.backToBlog}
      </Link>

      <article>
        <header className="mt-8 flex max-w-3xl flex-col gap-5">
          <PostMeta post={post} />
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{post.title}</h1>
          <p className="text-lg text-muted sm:text-xl">{post.description}</p>
          {post.tags.length > 0 ? (
            <ul className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <li key={tag}>
                  <Tag href={`/blog/tags/${tagSlug(tag)}`} prefix="#">
                    {tag}
                  </Tag>
                </li>
              ))}
            </ul>
          ) : null}
          {post.updated ? (
            <p className="font-mono text-xs text-muted">
              {dict.blog.updated}:{' '}
              <time dateTime={post.updated}>{formatDate(post.updated, post.locale)}</time>
            </p>
          ) : null}
        </header>

        <div className={showToc ? 'mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_15rem]' : 'mt-12'}>
          {showToc ? (
            <details className="rounded-xl border border-border bg-surface p-4 lg:hidden">
              <summary className="cursor-pointer font-mono text-sm text-fg">
                {dict.blog.toc}
              </summary>
              <div className="mt-4">
                <TocList headings={post.headings} />
              </div>
            </details>
          ) : null}

          <div className="prose prose-site min-w-0">
            <Content />
          </div>

          {showToc ? (
            <aside className="hidden lg:block">
              <TableOfContents headings={post.headings} title={dict.blog.toc} />
            </aside>
          ) : null}
        </div>
      </article>

      <PostNav previous={previous} next={next} />
    </Container>
  );
}
