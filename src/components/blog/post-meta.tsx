import { ClockIcon } from '@/components/icons';
import { getDictionary } from '@/i18n';
import type { Post } from '@/lib/content/posts';
import { cn } from '@/lib/cn';
import { formatDate } from '@/lib/format';

/** Fecha, tiempo de lectura y estado de borrador. */
export function PostMeta({ post, className }: { post: Post; className?: string }) {
  const dict = getDictionary(post.locale);

  return (
    <p
      className={cn(
        'flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted',
        className,
      )}
    >
      <time dateTime={post.date}>{formatDate(post.date, post.locale)}</time>
      <span aria-hidden="true">·</span>
      <span className="inline-flex items-center gap-1">
        <ClockIcon aria-hidden="true" />
        {dict.blog.readingTime(post.readingMinutes)}
      </span>
      {post.draft ? (
        <span className="rounded border border-dashed border-border-strong px-1.5 py-0.5 text-fg uppercase">
          {dict.blog.draft}
        </span>
      ) : null}
    </p>
  );
}
