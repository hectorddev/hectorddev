import { getAllProjects, getProject } from '@/lib/content/projects';
import { ogContentType, ogSize, renderOgImage } from '@/lib/og';

export const alt = 'Caso de estudio de Hector Márquez';
export const size = ogSize;
export const contentType = ogContentType;

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

/** Imagen OG generada para cada caso de estudio. */
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);
  return renderOgImage({
    path: `proyectos/${slug}`,
    kicker: 'caso de estudio',
    title: project?.title ?? 'Proyectos',
    description: project?.summary,
    tags: project?.stack,
  });
}
