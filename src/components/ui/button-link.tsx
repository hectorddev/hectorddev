import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost';

const variants: Record<Variant, string> = {
  primary:
    'bg-accent text-on-accent shadow-[0_0_0_1px_rgb(0_0_0/0.06)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-8px_var(--glow)]',
  secondary:
    'border border-border-strong bg-surface text-fg hover:-translate-y-0.5 hover:border-accent-fg',
  ghost: 'text-fg hover:text-accent-fg',
};

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  icon?: ReactNode;
  iconPosition?: 'start' | 'end';
  external?: boolean;
} & Omit<ComponentPropsWithoutRef<'a'>, 'href'>;

export function ButtonLink({
  href,
  variant = 'primary',
  icon,
  iconPosition = 'end',
  external,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  const classes = cn(
    'inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 py-2.5 font-mono text-sm font-medium transition duration-200 motion-reduce:transition-none motion-reduce:hover:translate-y-0',
    variants[variant],
    className,
  );

  const content = (
    <>
      {iconPosition === 'start' ? icon : null}
      {children}
      {iconPosition === 'end' ? icon : null}
    </>
  );

  // Archivos estáticos (PDF), anclas externas y mailto no usan <Link>.
  if (external || href.startsWith('mailto:') || href.endsWith('.pdf')) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {content}
    </Link>
  );
}
