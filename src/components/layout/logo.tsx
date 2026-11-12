import Link from 'next/link';
import { siteConfig } from '@/config/site';

export function Logo({ label }: { label: string }) {
  return (
    <Link
      href="/"
      aria-label={label}
      className="group inline-flex items-center rounded-md font-mono text-sm font-semibold tracking-tight text-fg"
    >
      <span className="text-accent-fg">~/</span>
      <span className="transition-colors group-hover:text-accent-fg">{siteConfig.handle}</span>
      <span className="caret" aria-hidden="true">
        _
      </span>
    </Link>
  );
}
