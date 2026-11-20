import { ArrowRightIcon, DownloadIcon, MapPinIcon } from '@/components/icons';
import { ButtonLink } from '@/components/ui/button-link';
import { Container } from '@/components/ui/container';
import { siteConfig } from '@/config/site';
import type { getSiteData } from '@/data';
import type { Dictionary } from '@/i18n';
import { Terminal } from './terminal';

type HeroProps = {
  dict: Dictionary;
  profile: ReturnType<typeof getSiteData>['profile'];
};

export function Hero({ dict, profile }: HeroProps) {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="bg-dot-grid absolute inset-0 -z-10" />
      <div aria-hidden="true" className="glow absolute -top-60 -right-52 -z-10 size-[46rem]" />

      <Container className="grid gap-12 pt-14 pb-20 sm:pt-20 sm:pb-28 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-16">
        <div className="flex flex-col items-start">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-3 py-1 font-mono text-xs text-fg backdrop-blur">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full rounded-full bg-accent-fg opacity-60 motion-safe:lg:animate-ping" />
              <span className="relative inline-flex size-2 rounded-full bg-accent-fg" />
            </span>
            {dict.hero.available}
          </p>

          <p className="mt-8 font-mono text-sm text-muted">{dict.hero.greeting}</p>
          <h1
            id="hero-title"
            className="mt-2 text-5xl leading-[0.95] font-extrabold tracking-tight text-fg sm:text-7xl"
          >
            {profile.name}
          </h1>
          <p className="mt-5 font-mono text-sm leading-relaxed text-accent-fg sm:text-base">
            {profile.headline}
          </p>
          <p className="mt-6 max-w-xl text-xl leading-relaxed text-muted sm:text-2xl">
            {profile.valueProp.before}
            <span className="highlight">{profile.valueProp.highlight}</span>
            {profile.valueProp.after}
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/proyectos" icon={<ArrowRightIcon />}>
              {dict.hero.ctaProjects}
            </ButtonLink>
            <ButtonLink
              href={siteConfig.cvPdf}
              variant="secondary"
              icon={<DownloadIcon />}
              download
            >
              {dict.hero.ctaCv}
            </ButtonLink>
            <ButtonLink href="/#contacto" variant="ghost">
              {dict.hero.ctaContact}
            </ButtonLink>
          </div>

          <p className="mt-8 inline-flex items-center gap-2 font-mono text-xs text-muted">
            <MapPinIcon aria-hidden="true" />
            {profile.location} · {profile.timezone}
          </p>
        </div>

        <Terminal title={`~/${siteConfig.handle} — zsh`} lines={profile.terminal} />
      </Container>
    </section>
  );
}
