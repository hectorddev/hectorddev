import Link from 'next/link';
import { siteConfig } from '@/config/site';

/**
 * Logo tipo prompt. El nombre accesible incluye el texto visible
 * ("hectorddev", WCAG 2.5.3) más una pista de destino solo para lectores.
 */
export function Logo({ label }: { label: string }) {
  return (
    <Link
      href="/"
      className="group inline-flex items-center rounded-md font-mono text-sm font-semibold tracking-tight text-fg"
    >
      <span aria-hidden="true" className="text-accent-fg">
        ~/
      </span>
      <span className="transition-colors group-hover:text-accent-fg">{siteConfig.handle}</span>
      <span className="caret" aria-hidden="true">
        _
      </span>
      <span className="sr-only">, {label}</span>
    </Link>
  );
}
