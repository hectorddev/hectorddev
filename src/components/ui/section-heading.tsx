import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type SectionHeadingProps = {
  /** Etiqueta tipo comentario de código: `// 01 · sobre-mí` */
  index?: string;
  label: string;
  title: ReactNode;
  id?: string;
  as?: 'h1' | 'h2';
  className?: string;
  children?: ReactNode;
};

export function SectionHeading({
  index,
  label,
  title,
  id,
  as: Heading = 'h2',
  className,
  children,
}: SectionHeadingProps) {
  return (
    <div className={cn('mb-10 flex flex-col gap-3', className)}>
      <p className="font-mono text-sm text-accent-fg">
        <span aria-hidden="true">{'// '}</span>
        {index ? `${index} · ` : null}
        {label}
      </p>
      <Heading
        id={id}
        className={cn(
          'font-bold tracking-tight text-fg',
          Heading === 'h1' ? 'text-4xl sm:text-5xl' : 'text-3xl sm:text-4xl',
        )}
      >
        {title}
      </Heading>
      {children ? <div className="max-w-2xl text-lg text-muted">{children}</div> : null}
    </div>
  );
}
