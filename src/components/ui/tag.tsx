import Link from 'next/link';
import { cn } from '@/lib/cn';

type TagProps = {
  children: string;
  href?: string;
  active?: boolean;
  prefix?: string;
  className?: string;
};

const base =
  'inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-xs transition-colors duration-150';

export function Tag({ children, href, active, prefix = '', className }: TagProps) {
  const classes = cn(
    base,
    active ? 'border-accent bg-accent text-on-accent' : 'border-border bg-surface-2 text-muted',
    href && !active && 'hover:border-accent-fg hover:text-accent-fg',
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes} aria-current={active ? 'page' : undefined}>
        {prefix}
        {children}
      </Link>
    );
  }

  return (
    <span className={classes}>
      {prefix}
      {children}
    </span>
  );
}
