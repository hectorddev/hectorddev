import Link from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';

type MdxLinkProps = ComponentPropsWithoutRef<'a'> & { newTabLabel: string };

/** Links internos con next/link; externos en pestaña nueva con aviso accesible. */
export function MdxLink({ href = '', children, newTabLabel, ...props }: MdxLinkProps) {
  if (href.startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }

  if (/^https?:\/\//.test(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
        <span className="sr-only"> {newTabLabel}</span>
      </a>
    );
  }

  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
}
