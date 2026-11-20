import { ArrowRightIcon } from '@/components/icons';
import { ProjectCard } from '@/components/projects/project-card';
import { ButtonLink } from '@/components/ui/button-link';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import type { Dictionary } from '@/i18n';
import type { Project } from '@/lib/content/projects';

type FeaturedProjectsProps = {
  index: string;
  dict: Dictionary;
  projects: Project[];
};

export function FeaturedProjects({ index, dict, projects }: FeaturedProjectsProps) {
  if (projects.length === 0) return null;

  return (
    <section
      id="proyectos"
      aria-labelledby="proyectos-title"
      className="defer-render py-16 sm:py-24"
    >
      <Container>
        <div data-reveal>
          <SectionHeading
            id="proyectos-title"
            index={index}
            label={dict.home.featuredLabel}
            title={dict.home.featuredTitle}
          />
        </div>
        <ul className="grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <li key={project.slug} data-reveal>
              <ProjectCard project={project} className="h-full" />
            </li>
          ))}
        </ul>
        <ButtonLink
          href="/proyectos"
          variant="secondary"
          icon={<ArrowRightIcon />}
          className="mt-10"
        >
          {dict.home.featuredAll}
        </ButtonLink>
      </Container>
    </section>
  );
}
