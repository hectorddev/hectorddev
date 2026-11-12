import { PostList } from '@/components/blog/post-list';
import { ArrowRightIcon } from '@/components/icons';
import { ButtonLink } from '@/components/ui/button-link';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import type { Dictionary } from '@/i18n';
import type { Post } from '@/lib/content/posts';

type LatestPostsProps = {
  index: string;
  dict: Dictionary;
  posts: Post[];
};

/** Se oculta por completo si no hay artículos publicados. */
export function LatestPosts({ index, dict, posts }: LatestPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section id="blog" aria-labelledby="blog-title" className="py-16 sm:py-24">
      <Container>
        <div data-reveal>
          <SectionHeading
            id="blog-title"
            index={index}
            label={dict.home.postsLabel}
            title={dict.home.postsTitle}
          />
        </div>
        <PostList posts={posts} headingLevel="h3" showTags={false} />
        <ButtonLink href="/blog" variant="secondary" icon={<ArrowRightIcon />} className="mt-10">
          {dict.home.postsAll}
        </ButtonLink>
      </Container>
    </section>
  );
}
