import Link from 'next/link';
import { ArrowRightIcon } from '@/components/icons';
import { Tag } from '@/components/ui/tag';
import { type Post, tagSlug } from '@/lib/content/posts';
import { PostMeta } from './post-meta';

type PostListProps = {
  posts: Post[];
  headingLevel?: 'h2' | 'h3';
  showTags?: boolean;
};

export function PostList({ posts, headingLevel: Heading = 'h2', showTags = true }: PostListProps) {
  return (
    <ul className="flex flex-col divide-y divide-border border-y border-border">
      {posts.map((post) => (
        <li key={post.slug} data-reveal>
          <article className="group relative flex flex-col gap-3 py-7 has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-accent-fg">
            <PostMeta post={post} />
            <Heading className="text-xl font-semibold tracking-tight text-fg sm:text-2xl">
              <Link
                href={post.url}
                className="transition-colors group-hover:text-accent-fg after:absolute after:inset-0 focus-visible:outline-none"
              >
                {post.title}
              </Link>
            </Heading>
            <p className="max-w-3xl text-muted">{post.description}</p>
            <div className="flex items-center justify-between gap-4">
              {showTags && post.tags.length > 0 ? (
                <ul className="relative z-10 flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <li key={tag}>
                      <Tag href={`/blog/tags/${tagSlug(tag)}`} prefix="#">
                        {tag}
                      </Tag>
                    </li>
                  ))}
                </ul>
              ) : (
                <span />
              )}
              <ArrowRightIcon
                aria-hidden="true"
                className="shrink-0 text-lg text-muted transition group-hover:text-accent-fg motion-safe:group-hover:translate-x-1"
              />
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
