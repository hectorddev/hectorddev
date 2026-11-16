import { z } from 'zod';

const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Usa el formato AAAA-MM-DD (por ejemplo 2026-11-12)');

/** Frontmatter de un artículo del blog. */
export const postFrontmatterSchema = z.strictObject({
  title: z.string().min(1),
  description: z.string().min(1),
  date: isoDate,
  updated: isoDate.optional(),
  tags: z.array(z.string().min(1)).default([]),
  draft: z.boolean().default(false),
});

export type PostFrontmatter = z.infer<typeof postFrontmatterSchema>;

export const projectStatuses = ['en-produccion', 'beta', 'proximamente'] as const;

/** Frontmatter de un caso de estudio. */
export const projectFrontmatterSchema = z
  .strictObject({
    title: z.string().min(1),
    summary: z.string().min(1),
    /** Cliente o contexto del proyecto. */
    client: z.string().min(1),
    /** Texto libre: "2023", "2021 – 2024", "[COMPLETAR]". */
    year: z.coerce.string().min(1),
    role: z.string().min(1),
    stack: z.array(z.string().min(1)).min(1),
    liveUrl: z.url().optional(),
    repoUrl: z.url().optional(),
    /** Enlaces adicionales con texto propio (otros sitios del mismo proyecto). */
    links: z.array(z.strictObject({ label: z.string().min(1), url: z.url() })).optional(),
    /** Ruta dentro de /public, p. ej. /images/proyectos/mi-proyecto/portada.webp */
    cover: z.string().startsWith('/').optional(),
    coverAlt: z.string().min(1).optional(),
    featured: z.boolean().default(false),
    /** Orden en los listados (menor primero). */
    order: z.number().int().optional(),
    status: z.enum(projectStatuses).optional(),
  })
  .refine((data) => !data.cover || data.coverAlt, {
    message: 'coverAlt es obligatorio cuando hay imagen de portada (accesibilidad)',
    path: ['coverAlt'],
  });

export type ProjectFrontmatter = z.infer<typeof projectFrontmatterSchema>;
export type ProjectStatus = (typeof projectStatuses)[number];
