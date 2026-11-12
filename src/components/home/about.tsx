import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import type { getSiteData } from '@/data';
import type { Dictionary } from '@/i18n';

type AboutProps = {
  index: string;
  dict: Dictionary;
  profile: ReturnType<typeof getSiteData>['profile'];
};

export function About({ index, dict, profile }: AboutProps) {
  return (
    <section id="sobre-mi" aria-labelledby="sobre-mi-title" className="py-16 sm:py-24">
      <Container>
        <div data-reveal>
          <SectionHeading
            id="sobre-mi-title"
            index={index}
            label={dict.home.aboutLabel}
            title={dict.home.aboutTitle}
          />
        </div>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem]" data-reveal>
          <div className="flex max-w-2xl flex-col gap-5 text-lg leading-relaxed text-fg">
            {profile.about.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
          <dl className="grid h-fit grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-1">
            {profile.facts.map((fact) => (
              <div key={fact.label} className="flex flex-col gap-1 bg-surface p-4">
                <dt className="font-mono text-xs tracking-wider text-muted uppercase">
                  {fact.label}
                </dt>
                <dd className="font-medium text-fg">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
