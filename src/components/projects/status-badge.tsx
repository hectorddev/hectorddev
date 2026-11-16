import type { ProjectStatus } from '@/lib/content/schemas';
import { getDictionary } from '@/i18n';
import { cn } from '@/lib/cn';

export function StatusBadge({ status, className }: { status: ProjectStatus; className?: string }) {
  const dict = getDictionary();
  const live = status !== 'proximamente';

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-0.5 font-mono text-xs text-fg',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn('size-1.5 rounded-full', live ? 'bg-accent-fg' : 'bg-muted')}
      />
      {dict.projects.status[status]}
    </span>
  );
}
