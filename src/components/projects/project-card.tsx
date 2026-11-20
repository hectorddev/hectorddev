import Link from 'next/link';
import { ArrowUpRightIcon } from '@/components/icons';
import { Tag } from '@/components/ui/tag';
import { getDictionary } from '@/i18n';
import type { Project } from '@/lib/content/projects';
import { cn } from '@/lib/cn';
import { ProjectCover } from './project-cover';
import { StatusBadge } from './status-badge';

const MAX_TAGS = 4;

type ProjectCardProps = {
  project: Project;
  headingLevel?: 'h2' | 'h3';
  /** Carga la portada sin diferir: úsalo en las tarjetas visibles al cargar (LCP). */
  priority?: boolean;
  className?: string;
};

export function ProjectCard({
  project,
  headingLevel: Heading = 'h3',
  priority,
  className,
}: ProjectCardProps) {
  const dict = getDictionary(project.locale);
  const visibleStack = project.stack.slice(0, MAX_TAGS);
  const hidden = project.stack.length - visibleStack.length;

  return (
    <article
      className={cn(
        'group relative flex flex-col gap-4 rounded-2xl border border-border bg-surface p-3 pb-5 transition duration-300 hover:border-border-strong has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-accent-fg motion-safe:lg:hover:-translate-y-1 motion-safe:lg:hover:shadow-[0_20px_40px_-24px_var(--glow)]',
        className,
      )}
    >
      <div className="relative">
        <ProjectCover
          project={project}
          priority={priority}
          sizes="(min-width: 1024px) 480px, (min-width: 640px) 50vw, 100vw"
        />
        {project.status ? (
          <StatusBadge
            status={project.status}
            className={cn('absolute right-3 shadow-sm', project.cover ? 'top-3' : 'top-11')}
          />
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-3 px-2">
        <p className="font-mono text-xs text-muted">{project.client}</p>
        <div className="flex items-start justify-between gap-3">
          <Heading className="text-xl font-semibold tracking-tight text-fg">
            <Link
              href={project.url}
              className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none"
            >
              {project.title}
            </Link>
          </Heading>
          <ArrowUpRightIcon
            aria-hidden="true"
            className="mt-1 shrink-0 text-lg text-muted transition duration-300 group-hover:text-accent-fg motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
          />
        </div>
        <p className="line-clamp-3 text-muted">{project.summary}</p>

        <ul className="mt-auto flex flex-wrap gap-1.5 pt-2" aria-label={dict.projects.stack}>
          {visibleStack.map((tech) => (
            <li key={tech}>
              <Tag>{tech}</Tag>
            </li>
          ))}
          {hidden > 0 ? (
            <li>
              <Tag>{`+${hidden}`}</Tag>
            </li>
          ) : null}
        </ul>
      </div>
    </article>
  );
}
