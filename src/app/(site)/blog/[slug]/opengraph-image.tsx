import { getAllPosts, getPost } from '@/lib/content/posts';
import { ogContentType, ogSize, renderOgImage } from '@/lib/og';

export const alt = 'Artículo del blog de Hector Márquez';
export const size = ogSize;
export const contentType = ogContentType;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

/** Imagen OG generada para cada artículo. */
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  return renderOgImage({
    path: `blog/${slug}`,
    kicker: 'blog',
    title: post?.title ?? 'Blog',
    description: post?.description,
    tags: post?.tags,
  });
}
