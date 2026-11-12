import fs from 'node:fs/promises';
import path from 'node:path';
import { parse as parseYaml } from 'yaml';
import { z } from 'zod';
import type { Locale } from '@/i18n';

export const CONTENT_ROOT = path.join(process.cwd(), 'content');
export const PUBLIC_ROOT = path.join(process.cwd(), 'public');

export type Collection = 'blog' | 'proyectos';

export type RawEntry = {
  slug: string;
  /** Ruta relativa al repo, útil en mensajes de error. */
  file: string;
  data: unknown;
  body: string;
};

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/;

/** Lee todos los .mdx de una colección. Los archivos que empiezan con `_` se ignoran. */
export async function readCollection(locale: Locale, collection: Collection): Promise<RawEntry[]> {
  const dir = path.join(CONTENT_ROOT, locale, collection);
  let names: string[];
  try {
    names = await fs.readdir(dir);
  } catch {
    return [];
  }

  const files = names.filter((name) => name.endsWith('.mdx') && !name.startsWith('_'));

  return Promise.all(
    files.map(async (name) => {
      const absolute = path.join(dir, name);
      const source = await fs.readFile(absolute, 'utf8');
      const file = path.relative(process.cwd(), absolute).replaceAll('\\', '/');
      const match = FRONTMATTER.exec(source);
      if (!match) {
        throw new Error(`[contenido] ${file}: falta el bloque de frontmatter entre "---".`);
      }
      return {
        slug: name.replace(/\.mdx$/, ''),
        file,
        data: parseYaml(match[1] ?? '') ?? {},
        body: source.slice(match[0].length),
      };
    }),
  );
}

/** Valida el frontmatter y lanza un error legible que hace fallar el build. */
export function validateFrontmatter<T extends z.ZodType>(schema: T, entry: RawEntry): z.infer<T> {
  const result = schema.safeParse(entry.data);
  if (!result.success) {
    throw new Error(
      `[contenido] Frontmatter inválido en ${entry.file}:\n${z.prettifyError(result.error)}`,
    );
  }
  return result.data;
}

export async function assertPublicFileExists(publicPath: string, file: string): Promise<void> {
  try {
    await fs.access(path.join(PUBLIC_ROOT, publicPath));
  } catch {
    throw new Error(`[contenido] ${file}: no existe el archivo public${publicPath}`);
  }
}
