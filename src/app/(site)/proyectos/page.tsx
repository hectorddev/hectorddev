import { ProjectCard } from '@/components/projects/project-card';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { getDictionary } from '@/i18n';
import { getAllProjects } from '@/lib/content/projects';
import { pageMetadata } from '@/lib/seo';

const dict = getDictionary();

export const metadata = pageMetadata({
  title: dict.projects.title,
  description: dict.projects.description,
  path: '/proyectos',
});

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <Container className="py-16 sm:py-24">
      <SectionHeading as="h1" label="ls ./proyectos" title={dict.projects.title}>
        <p>{dict.projects.intro}</p>
      </SectionHeading>

      <ul className="grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <li key={project.slug} data-reveal>
            <ProjectCard project={project} headingLevel="h2" className="h-full" />
          </li>
        ))}
      </ul>
    </Container>
  );
}
