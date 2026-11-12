import { MusicIcon, RssIcon } from '@/components/icons';
import { Container } from '@/components/ui/container';
import { siteConfig } from '@/config/site';
import type { Dictionary } from '@/i18n';
import { Logo } from './logo';
import { getSocialLinks } from './social-links';

export function Footer({ dict }: { dict: Dictionary }) {
  const links = getSocialLinks(dict);
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-border">
      <Container className="flex flex-col gap-8 py-10 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-3">
          <Logo label={dict.a11y.homeLink} />
          <p className="flex items-center gap-2 text-sm text-muted">
            <MusicIcon className="text-accent-fg" />
            {dict.footer.madeIn}
          </p>
        </div>

        <nav aria-label={dict.a11y.footerNav}>
          <ul className="flex flex-wrap items-center gap-2">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-label={link.external ? `${link.label} ${dict.a11y.newTab}` : link.label}
                  {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="inline-flex size-11 items-center justify-center rounded-lg border border-border text-lg text-muted transition-colors hover:border-accent-fg hover:text-accent-fg"
                >
                  {link.icon}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/rss.xml"
                aria-label={dict.blog.rss}
                className="inline-flex size-11 items-center justify-center rounded-lg border border-border text-lg text-muted transition-colors hover:border-accent-fg hover:text-accent-fg"
              >
                <RssIcon />
              </a>
            </li>
          </ul>
        </nav>
      </Container>

      <Container className="flex flex-col gap-2 border-t border-border/60 py-6 font-mono text-xs text-muted sm:flex-row sm:justify-between">
        <p>
          © {year} {siteConfig.name}. {dict.footer.builtWith}
        </p>
        <a
          href={siteConfig.links.siteRepo}
          target="_blank"
          rel="noopener noreferrer"
          className="link w-fit"
        >
          {dict.footer.source}
          <span className="sr-only"> {dict.a11y.newTab}</span>
        </a>
      </Container>
    </footer>
  );
}
