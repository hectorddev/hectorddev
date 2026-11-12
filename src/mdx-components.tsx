import type { MDXComponents } from 'mdx/types';
import type { ComponentPropsWithoutRef } from 'react';
import { Callout } from '@/components/mdx/callout';
import { CodeBlock } from '@/components/mdx/code-block';
import { Figure, MdxImage } from '@/components/mdx/figure';
import { MdxLink } from '@/components/mdx/mdx-link';
import { getDictionary } from '@/i18n';

const dict = getDictionary();

const components: MDXComponents = {
  a: (props: ComponentPropsWithoutRef<'a'>) => (
    <MdxLink {...props} newTabLabel={dict.a11y.newTab} />
  ),
  pre: (props: ComponentPropsWithoutRef<'pre'>) => <CodeBlock {...props} labels={dict.code} />,
  img: MdxImage,
  table: (props: ComponentPropsWithoutRef<'table'>) => (
    <div className="overflow-x-auto">
      <table {...props} />
    </div>
  ),
  Figure,
  Callout,
};

/** Requerido por @next/mdx: componentes disponibles en todos los MDX. */
export function useMDXComponents(inherited: MDXComponents): MDXComponents {
  return { ...inherited, ...components };
}
