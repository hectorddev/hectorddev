import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeftIcon, ArrowUpRightIcon, GithubIcon } from '@/components/icons';
import { ProjectCard } from '@/components/projects/project-card';
import { ProjectCover } from '@/components/projects/project-cover';
import { StatusBadge } from '@/components/projects/status-badge';
import { ButtonLink } from '@/components/ui/button-link';
import { Container } from '@/components/ui/container';
import { Tag } from '@/components/ui/tag';
import { getDictionary } from '@/i18n';
import { loadMdx } from '@/lib/content/mdx';
import { getAllProjects, getProject } from '@/lib/content/projects';
import { pageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  return pageMetadata({
    title: project.title,
    description: project.summary,
    path: project.url,
    type: 'article',
    tags: project.stack,
  });
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const dict = getDictionary(project.locale);
  const Content = await loadMdx('proyectos', project.locale, project.slug);
  const others = (await getAllProjects(project.locale))
    .filter((other) => other.slug !== project.slug)
    .slice(0, 2);

  const meta = [
    { label: dict.projects.client, value: project.client },
    { label: dict.projects.year, value: project.year },
    { label: dict.projects.role, value: project.role },
  ];

  return (
    <>
      <Container as="article" className="py-12 sm:py-16">
        <Link
          href="/proyectos"
          className="inline-flex min-h-11 items-center gap-2 font-mono text-sm text-muted transition-colors hover:text-accent-fg"
        >
          <ArrowLeftIcon aria-hidden="true" />
          {dict.projects.back}
        </Link>

        <header className="mt-8 flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-3">
            <p className="font-mono text-sm text-accent-fg">
              <span aria-hidden="true">{'// '}</span>
              {dict.projects.title.toLowerCase()}
            </p>
            {project.status ? <StatusBadge status={project.status} /> : null}
          </div>
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {project.title}
          </h1>
          <p className="max-w-3xl text-lg text-muted sm:text-xl">{project.summary}</p>

          {project.liveUrl || project.repoUrl ? (
            <div className="flex flex-wrap gap-3">
              {project.liveUrl ? (
                <ButtonLink href={project.liveUrl} external icon={<ArrowUpRightIcon />}>
                  {dict.projects.live}
                  <span className="sr-only"> {dict.a11y.newTab}</span>
                </ButtonLink>
              ) : null}
              {project.repoUrl ? (
                <ButtonLink
                  href={project.repoUrl}
                  external
                  variant="secondary"
                  icon={<GithubIcon />}
                  iconPosition="start"
                >
                  {dict.projects.repo}
                  <span className="sr-only"> {dict.a11y.newTab}</span>
                </ButtonLink>
              ) : null}
            </div>
          ) : null}

          <dl className="grid gap-6 border-y border-border py-6 sm:grid-cols-2 lg:grid-cols-4">
            {meta.map((item) => (
              <div key={item.label} className="flex flex-col gap-1">
                <dt className="font-mono text-xs tracking-wider text-muted uppercase">
                  {item.label}
                </dt>
                <dd className="text-fg">{item.value}</dd>
              </div>
            ))}
            <div className="flex flex-col gap-2">
              <dt className="font-mono text-xs tracking-wider text-muted uppercase">
                {dict.projects.stack}
              </dt>
              <dd>
                <ul className="flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <li key={tech}>
                      <Tag>{tech}</Tag>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </header>

        {project.cover ? (
          <ProjectCover
            project={project}
            priority
            sizes="(min-width: 1024px) 960px, 100vw"
            className="mt-10"
          />
        ) : null}

        <div className="prose prose-site mt-12">
          <Content />
        </div>
      </Container>

      {others.length > 0 ? (
        <Container as="section" aria-labelledby="otros-proyectos" className="pt-8">
          <h2 id="otros-proyectos" className="mb-8 text-2xl font-bold tracking-tight">
            {dict.projects.others}
          </h2>
          <ul className="grid gap-6 sm:grid-cols-2">
            {others.map((other) => (
              <li key={other.slug} data-reveal>
                <ProjectCard project={other} className="h-full" />
              </li>
            ))}
          </ul>
        </Container>
      ) : null}
    </>
  );
}
