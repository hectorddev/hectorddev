import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type CalloutType = 'nota' | 'tip' | 'aviso';

const styles: Record<CalloutType, string> = {
  nota: 'border-border-strong',
  tip: 'border-accent-fg',
  aviso: 'border-fg',
};

/**
 * Bloque destacado. Uso en MDX:
 * <Callout type="tip" title="Dato">Texto…</Callout>
 */
export function Callout({
  type = 'nota',
  title,
  children,
}: {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}) {
  return (
    <aside
      className={cn(
        'not-prose my-8 rounded-r-lg border-l-4 bg-surface-2/60 px-5 py-4 text-base text-fg',
        styles[type],
      )}
    >
      <p className="mb-1 font-mono text-xs tracking-wider text-muted uppercase">{title || type}</p>
      <div className="[&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-accent-fg [&>p]:my-1">
        {children}
      </div>
    </aside>
  );
}
