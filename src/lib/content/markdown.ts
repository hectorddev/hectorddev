import GithubSlugger from 'github-slugger';

export type Heading = {
  id: string;
  text: string;
  level: 2 | 3;
};

/** Quita bloques de código cercados (``` y ~~~) para no contar su contenido. */
function stripCodeFences(markdown: string): string {
  return markdown.replace(/^(```|~~~)[\s\S]*?^\1\s*$/gm, '');
}

/** Convierte el texto de un título Markdown al texto plano que renderiza MDX. */
function headingToPlainText(raw: string): string {
  return raw
    .replace(/\s+#+\s*$/, '')
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/(\*\*|__)(.*?)\1/g, '$2')
    .replace(/(\*|_)(.*?)\1/g, '$2')
    .replace(/~~(.*?)~~/g, '$1')
    .trim();
}

/**
 * Extrae los títulos h2/h3 para la tabla de contenidos. Los IDs usan
 * github-slugger, el mismo algoritmo que rehype-slug, recorriendo todos los
 * niveles en orden para que los sufijos de duplicados coincidan.
 */
export function extractHeadings(markdown: string): Heading[] {
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];

  for (const line of stripCodeFences(markdown).split(/\r?\n/)) {
    const match = /^(#{1,6})\s+(.+)$/.exec(line);
    if (!match?.[1] || !match[2]) continue;

    const level = match[1].length;
    const text = headingToPlainText(match[2]);
    const id = slugger.slug(text);

    if (level === 2 || level === 3) headings.push({ id, text, level });
  }

  return headings;
}

const WORDS_PER_MINUTE = 200;

/** Minutos estimados de lectura (mínimo 1). */
export function readingMinutes(markdown: string): number {
  const text = stripCodeFences(markdown)
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, ' ') // comentarios MDX
    .replace(/<[^>]+>/g, ' ') // etiquetas JSX/HTML
    .replace(/[#>*_`~[\]()!-]/g, ' ');
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}
