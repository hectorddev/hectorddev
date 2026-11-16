import type { ReactNode } from 'react';
import { getDictionary } from '@/i18n';
import { Footer } from './footer';
import { Header } from './header';

/** Estructura común de las páginas públicas: salto al contenido, header, main y footer. */
export function SiteShell({ children }: { children: ReactNode }) {
  const dict = getDictionary();

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#contenido"
        className="sr-only z-50 rounded-md bg-accent px-4 py-2 font-mono text-sm text-on-accent focus:not-sr-only focus:fixed focus:top-3 focus:left-3 print:hidden"
      >
        {dict.a11y.skipToContent}
      </a>
      <Header dict={dict} />
      <main id="contenido" tabIndex={-1} className="flex-1 outline-none">
        {children}
      </main>
      <Footer dict={dict} />
    </div>
  );
}
