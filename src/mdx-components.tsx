import type { MDXComponents } from 'mdx/types';

/** Requerido por @next/mdx en App Router. */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...components };
}
