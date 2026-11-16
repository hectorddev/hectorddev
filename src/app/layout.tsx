import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, Geist, JetBrains_Mono } from 'next/font/google';
import type { ReactNode } from 'react';
import { defaultLocale, getDictionary } from '@/i18n';
import { siteUrl } from '@/lib/site-url';
import { themeInitScript } from '@/lib/theme';

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
});

const sans = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

const dict = getDictionary(defaultLocale);

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: dict.meta.siteTitle,
    template: `%s · ${dict.meta.siteName}`,
  },
  description: dict.meta.siteDescription,
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f6f6f1' },
    { media: '(prefers-color-scheme: dark)', color: '#0b0d10' },
  ],
};

/**
 * Layout raíz mínimo: compartido por el sitio público, `(site)`, y el panel
 * de contenido, `/keystatic`. Los estilos y el header del sitio viven en
 * `(site)/layout.tsx` para no interferir con la interfaz del panel.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang={defaultLocale}
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${dict.blog.title} · ${dict.meta.siteName}`}
          href="/rss.xml"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
