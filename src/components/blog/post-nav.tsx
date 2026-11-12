import Link from 'next/link';
import { ArrowLeftIcon, ArrowRightIcon } from '@/components/icons';
import { getDictionary } from '@/i18n';
import type { Post } from '@/lib/content/posts';
import { cn } from '@/lib/cn';

type PostNavProps = { previous?: Post; next?: Post };

/** Links al artículo anterior (más antiguo) y siguiente (más reciente). */
export function PostNav({ previous, next }: PostNavProps) {
  if (!previous && !next) return null;
  const dict = getDictionary(previous?.locale ?? next?.locale);

  const card =
    'group flex flex-col gap-2 rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent-fg';

  return (
    <nav aria-label={`${dict.blog.previous} / ${dict.blog.next}`} className="mt-16">
      <ul className="grid gap-4 sm:grid-cols-2">
        <li>
          {previous ? (
            <Link href={previous.url} rel="prev" className={card}>
              <span className="inline-flex items-center gap-2 font-mono text-xs text-muted">
                <ArrowLeftIcon aria-hidden="true" />
                {dict.blog.previous}
              </span>
              <span className="font-semibold text-fg group-hover:text-accent-fg">
                {previous.title}
              </span>
            </Link>
          ) : null}
        </li>
        <li>
          {next ? (
            <Link href={next.url} rel="next" className={cn(card, 'sm:items-end sm:text-right')}>
              <span className="inline-flex items-center gap-2 font-mono text-xs text-muted">
                {dict.blog.next}
                <ArrowRightIcon aria-hidden="true" />
              </span>
              <span className="font-semibold text-fg group-hover:text-accent-fg">{next.title}</span>
            </Link>
          ) : null}
        </li>
      </ul>
    </nav>
  );
}
