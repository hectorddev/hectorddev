'use client';

import { useEffect, useState } from 'react';
import type { Heading } from '@/lib/content/markdown';
import { cn } from '@/lib/cn';

type TableOfContentsProps = {
  headings: Heading[];
  title: string;
};

/** Tabla de contenidos fija en escritorio; resalta la sección visible. */
export function TableOfContents({ headings, title }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((element): element is HTMLElement => element !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-80px 0px -65% 0px' },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [headings]);

  return (
    <nav aria-label={title} className="sticky top-24">
      <p className="mb-3 font-mono text-xs tracking-wider text-muted uppercase">{title}</p>
      <TocList headings={headings} activeId={activeId} />
    </nav>
  );
}

export function TocList({
  headings,
  activeId = null,
}: {
  headings: Heading[];
  activeId?: string | null;
}) {
  return (
    <ol className="flex flex-col gap-1 border-l border-border text-sm">
      {headings.map((heading) => {
        const active = heading.id === activeId;
        return (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              aria-current={active ? 'location' : undefined}
              className={cn(
                '-ml-px block border-l-2 py-1 transition-colors',
                heading.level === 3 ? 'pl-7' : 'pl-4',
                active
                  ? 'border-accent-fg text-fg'
                  : 'border-transparent text-muted hover:border-border-strong hover:text-fg',
              )}
            >
              {heading.text}
            </a>
          </li>
        );
      })}
    </ol>
  );
}
