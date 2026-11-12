export type StackGroup = { area: string; items: string[] };

/** Tecnologías agrupadas por área (inicio y CV). */
export const stack: StackGroup[] = [
  { area: 'Lenguajes', items: ['JavaScript', 'TypeScript', 'SQL'] },
  { area: 'Frontend', items: ['React', 'Next.js', 'Vite'] },
  { area: 'Móvil', items: ['React Native'] },
  { area: 'Backend', items: ['Node.js', 'Express', 'Prisma'] },
  { area: 'Bases de datos', items: ['PostgreSQL', 'MongoDB'] },
  { area: 'Cloud y despliegue', items: ['AWS', 'Vercel', 'Render', 'Neon'] },
  { area: 'E-commerce', items: ['Shopify', 'Liquid'] },
];
