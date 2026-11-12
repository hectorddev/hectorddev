import type { ReactNode } from 'react';
import { RssIcon } from '@/components/icons';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { getDictionary } from '@/i18n';
import type { Post, TagSummary } from '@/lib/content/posts';
import { PostList } from './post-list';
import { TagFilter } from './tag-filter';

type BlogIndexProps = {
  title: ReactNode;
  label: string;
  intro: string;
  posts: Post[];
  tags: TagSummary[];
  activeTag?: string;
};

/** Vista compartida por /blog y /blog/tags/[tag]. */
export function BlogIndex({ title, label, intro, posts, tags, activeTag }: BlogIndexProps) {
  const dict = getDictionary();

  return (
    <Container className="py-16 sm:py-24">
      <SectionHeading as="h1" label={label} title={title}>
        <p>{intro}</p>
        <a href="/rss.xml" className="link mt-4 inline-flex items-center gap-2 font-mono text-sm">
          <RssIcon aria-hidden="true" />
          {dict.blog.rss}
        </a>
      </SectionHeading>

      <TagFilter tags={tags} active={activeTag} />

      {posts.length > 0 ? (
        <PostList posts={posts} />
      ) : (
        <p className="rounded-xl border border-dashed border-border-strong p-8 font-mono text-sm text-muted">
          <span aria-hidden="true" className="text-accent-fg">
            ${' '}
          </span>
          {dict.blog.empty}
        </p>
      )}
    </Container>
  );
}
