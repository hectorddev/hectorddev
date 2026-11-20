import { getSocialLinks } from '@/components/layout/social-links';
import { ArrowUpRightIcon } from '@/components/icons';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { siteConfig } from '@/config/site';
import type { Dictionary } from '@/i18n';

export function Contact({ index, dict }: { index: string; dict: Dictionary }) {
  const links = getSocialLinks(dict).filter((link) => link.external);

  return (
    <section id="contacto" aria-labelledby="contacto-title" className="defer-render py-16 sm:py-24">
      <Container>
        <div
          data-reveal
          className="relative isolate overflow-hidden rounded-3xl border border-border bg-surface px-6 py-12 sm:px-12 sm:py-16"
        >
          <div aria-hidden="true" className="bg-dot-grid absolute inset-0 -z-10" />
          <div
            aria-hidden="true"
            className="glow absolute -bottom-48 -left-40 -z-10 size-[36rem]"
          />

          <SectionHeading
            id="contacto-title"
            index={index}
            label={dict.home.contactLabel}
            title={dict.contact.title}
            className="mb-8"
          >
            <p>{dict.contact.text}</p>
          </SectionHeading>

          <a
            href={`mailto:${siteConfig.email}`}
            className="group inline-flex max-w-full items-center gap-3 font-display text-xl font-bold tracking-tight [overflow-wrap:anywhere] text-fg min-[400px]:text-2xl sm:text-4xl"
          >
            <span className="highlight">{siteConfig.email}</span>
            <ArrowUpRightIcon
              aria-hidden="true"
              className="shrink-0 text-accent-fg transition motion-safe:group-hover:translate-x-1 motion-safe:group-hover:-translate-y-1"
            />
          </a>

          <ul className="mt-10 flex flex-wrap gap-3">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border-strong bg-bg px-4 py-2.5 font-mono text-sm text-fg transition hover:border-accent-fg hover:text-accent-fg"
                >
                  {link.icon}
                  <span>
                    {link.label}
                    <span className="text-muted"> · {link.value}</span>
                  </span>
                  <span className="sr-only"> {dict.a11y.newTab}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
