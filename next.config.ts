import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Keystatic en modo GitHub redirige localhost → 127.0.0.1 (requisito de OAuth).
  // Next 16 bloquea en desarrollo los recursos /_next pedidos desde otro origen.
  allowedDevOrigins: ['127.0.0.1'],
};

/**
 * Plugins declarados como string (con opciones serializables) para que
 * funcionen con Turbopack, el bundler por defecto de Next 16.
 */
const withMDX = createMDX({
  extension: /\.mdx$/,
  options: {
    remarkPlugins: ['remark-frontmatter', 'remark-gfm'],
    rehypePlugins: [
      'rehype-slug',
      [
        'rehype-autolink-headings',
        {
          behavior: 'append',
          properties: { className: ['heading-anchor'], ariaHidden: true, tabIndex: -1 },
          content: { type: 'text', value: '#' },
        },
      ],
      [
        'rehype-pretty-code',
        {
          theme: { light: 'github-light', dark: 'github-dark-dimmed' },
          keepBackground: false,
          defaultLang: { block: 'plaintext' },
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);
