import { About } from '@/components/home/about';
import { Contact } from '@/components/home/contact';
import { FeaturedProjects } from '@/components/home/featured-projects';
import { Hero } from '@/components/home/hero';
import { LatestPosts } from '@/components/home/latest-posts';
import { StackSection } from '@/components/home/stack-section';
import { getSiteData } from '@/data';
import { getDictionary } from '@/i18n';
import { getAllPosts } from '@/lib/content/posts';
import { getFeaturedProjects } from '@/lib/content/projects';
import { pageMetadata } from '@/lib/seo';

const dict = getDictionary();

export const metadata = pageMetadata({
  title: dict.meta.siteTitle,
  description: dict.meta.siteDescription,
  path: '/',
  type: 'profile',
  absoluteTitle: true,
});

const LATEST_POSTS = 3;

export default async function HomePage() {
  const { profile, stack } = getSiteData();
  const [projects, posts] = await Promise.all([getFeaturedProjects(), getAllPosts()]);
  const latestPosts = posts.slice(0, LATEST_POSTS);

  // Numeración de secciones: "blog" solo existe si hay artículos.
  const sections = [
    'about',
    'stack',
    'projects',
    ...(latestPosts.length ? ['blog'] : []),
    'contact',
  ];
  const index = (key: string) => String(sections.indexOf(key) + 1).padStart(2, '0');

  return (
    <>
      <Hero dict={dict} profile={profile} />
      <About index={index('about')} dict={dict} profile={profile} />
      <StackSection index={index('stack')} dict={dict} stack={stack} />
      <FeaturedProjects index={index('projects')} dict={dict} projects={projects} />
      <LatestPosts index={index('blog')} dict={dict} posts={latestPosts} />
      <Contact index={index('contact')} dict={dict} />
    </>
  );
}
