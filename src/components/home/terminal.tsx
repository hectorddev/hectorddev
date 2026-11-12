import type { CSSProperties } from 'react';
import { cn } from '@/lib/cn';

type TerminalProps = {
  title: string;
  lines: { command: string; output: string }[];
  className?: string;
};

/**
 * Ventana de terminal decorativa del hero. Es aria-hidden porque la misma
 * información está en "Sobre mí". En escritorio las líneas aparecen en
 * secuencia (ver .terminal-line en globals.css).
 */
export function Terminal({ title, lines, className }: TerminalProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_30px_60px_-30px_rgb(0_0_0/0.35)]',
        className,
      )}
    >
      <div className="flex items-center gap-1.5 border-b border-border bg-surface-2 px-4 py-3">
        <span className="size-3 rounded-full bg-border-strong" />
        <span className="size-3 rounded-full bg-border-strong" />
        <span className="size-3 rounded-full bg-accent" />
        <span className="ml-3 font-mono text-xs text-muted">{title}</span>
      </div>
      <div className="flex flex-col gap-3 p-5 font-mono text-[0.8125rem] leading-relaxed sm:p-6 sm:text-sm">
        {lines.map((line, index) => (
          <div
            key={line.command}
            className="terminal-line"
            style={{ '--i': index } as CSSProperties}
          >
            <p className="text-muted">
              <span className="text-accent-fg">$</span> {line.command}
            </p>
            <p className="text-fg">{line.output}</p>
          </div>
        ))}
        <p className="terminal-line" style={{ '--i': lines.length } as CSSProperties}>
          <span className="text-accent-fg">$</span>{' '}
          <span className="caret inline-block h-4 w-2 translate-y-0.5 bg-accent-fg" />
        </p>
      </div>
    </div>
  );
}
