import Image from 'next/image';
import type { Project } from '@/lib/content/projects';
import { cn } from '@/lib/cn';

type ProjectCoverProps = {
  project: Project;
  priority?: boolean;
  sizes: string;
  className?: string;
};

/**
 * Portada del proyecto. Si no hay captura todavía, muestra una portada
 * tipográfica tipo ventana de terminal en lugar de una imagen inventada.
 */
export function ProjectCover({ project, priority, sizes, className }: ProjectCoverProps) {
  const frame = cn(
    'relative aspect-[16/9] overflow-hidden rounded-xl border border-border bg-surface-2',
    className,
  );

  if (project.cover) {
    return (
      <div className={frame}>
        <Image
          src={project.cover}
          alt={project.coverAlt ?? ''}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-top"
        />
      </div>
    );
  }

  return (
    <div className={frame} aria-hidden="true">
      <div className="bg-dot-grid absolute inset-0" />
      <div className="absolute inset-x-0 top-0 flex items-center gap-1.5 border-b border-border bg-surface/70 px-3 py-2">
        <span className="size-2.5 rounded-full bg-border-strong" />
        <span className="size-2.5 rounded-full bg-border-strong" />
        <span className="size-2.5 rounded-full bg-accent" />
        <span className="ml-2 truncate font-mono text-[0.7rem] text-muted">
          ~/proyectos/{project.slug}
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-4 font-mono text-xs sm:p-5 sm:text-sm">
        <p className="text-muted">
          <span className="text-accent-fg">$</span> cat stack.txt
        </p>
        <p className="line-clamp-2 text-fg">{project.stack.join(' · ')}</p>
      </div>
    </div>
  );
}
