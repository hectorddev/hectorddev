import { BlogIndex } from '@/components/blog/blog-index';
import { getDictionary } from '@/i18n';
import { getAllPosts, getAllTags } from '@/lib/content/posts';
import { pageMetadata } from '@/lib/seo';

const dict = getDictionary();

export const metadata = pageMetadata({
  title: dict.blog.title,
  description: dict.blog.description,
  path: '/blog',
});

export default async function BlogPage() {
  const [posts, tags] = await Promise.all([getAllPosts(), getAllTags()]);

  return (
    <BlogIndex
      title={dict.blog.title}
      label="ls ./blog"
      intro={dict.blog.intro}
      posts={posts}
      tags={tags}
    />
  );
}
