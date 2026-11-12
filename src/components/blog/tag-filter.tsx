import { Tag } from '@/components/ui/tag';
import { getDictionary, type Locale } from '@/i18n';
import type { TagSummary } from '@/lib/content/posts';

type TagFilterProps = {
  tags: TagSummary[];
  /** Slug del tag activo; undefined = "Todos". */
  active?: string;
  locale?: Locale;
};

/** Filtro por tags: cada tag es una página estática en /blog/tags/[tag]. */
export function TagFilter({ tags, active, locale }: TagFilterProps) {
  const dict = getDictionary(locale);
  if (tags.length === 0) return null;

  return (
    <nav aria-label={dict.blog.filterByTag} className="mb-8">
      <ul className="flex flex-wrap gap-2">
        <li>
          <Tag href="/blog" active={!active}>
            {dict.blog.allTags}
          </Tag>
        </li>
        {tags.map((tag) => (
          <li key={tag.slug}>
            <Tag href={`/blog/tags/${tag.slug}`} active={tag.slug === active} prefix="#">
              {`${tag.tag} (${tag.count})`}
            </Tag>
          </li>
        ))}
      </ul>
    </nav>
  );
}
