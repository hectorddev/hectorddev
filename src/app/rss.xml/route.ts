import { defaultLocale, getDictionary, localeTags } from '@/i18n';
import { getAllPosts } from '@/lib/content/posts';
import { toDate } from '@/lib/format';
import { absoluteUrl } from '@/lib/site-url';

export const dynamic = 'force-static';

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const dict = getDictionary();
  // Los borradores nunca salen en el feed, ni siquiera en Preview.
  const posts = (await getAllPosts()).filter((post) => !post.draft);
  const feedUrl = absoluteUrl('/rss.xml');
  const blogUrl = absoluteUrl('/blog');
  const lastBuild = posts[0] ? toDate(posts[0].updated ?? posts[0].date) : new Date();

  const items = posts
    .map((post) => {
      const url = absoluteUrl(post.url);
      const categories = post.tags
        .map((tag) => `      <category>${escapeXml(tag)}</category>`)
        .join('\n');
      return [
        '    <item>',
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <pubDate>${toDate(post.date).toUTCString()}</pubDate>`,
        `      <description>${escapeXml(post.description)}</description>`,
        categories,
        '    </item>',
      ]
        .filter(Boolean)
        .join('\n');
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${dict.blog.title} · ${dict.meta.siteName}`)}</title>
    <link>${blogUrl}</link>
    <description>${escapeXml(dict.blog.description)}</description>
    <language>${localeTags[defaultLocale].toLowerCase()}</language>
    <lastBuildDate>${lastBuild.toUTCString()}</lastBuildDate>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
