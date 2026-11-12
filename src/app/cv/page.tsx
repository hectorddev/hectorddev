import Link from 'next/link';
import type { ReactNode } from 'react';
import { getSocialLinks } from '@/components/layout/social-links';
import { DownloadIcon, MapPinIcon } from '@/components/icons';
import { ButtonLink } from '@/components/ui/button-link';
import { Container } from '@/components/ui/container';
import { Tag } from '@/components/ui/tag';
import { siteConfig } from '@/config/site';
import { getSiteData } from '@/data';
import { getDictionary } from '@/i18n';
import { getFeaturedProjects } from '@/lib/content/projects';
import { pageMetadata } from '@/lib/seo';

const dict = getDictionary();

export const metadata = pageMetadata({
  title: dict.cv.title,
  description: dict.cv.description,
  path: '/cv',
  type: 'profile',
});

function CvSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex break-inside-avoid flex-col gap-5">
      <h2 className="flex items-center gap-3 font-mono text-sm tracking-wider text-accent-fg uppercase">
        {title}
        <span aria-hidden="true" className="h-px flex-1 bg-border" />
      </h2>
      {children}
    </section>
  );
}

export default async function CvPage() {
  const { profile, stack, cv } = getSiteData();
  const projects = await getFeaturedProjects();
  const links = getSocialLinks(dict);

  return (
    <Container className="py-12 sm:py-16 print:py-0">
      <header className="flex flex-col gap-6 border-b border-border pb-10 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-3">
          <p className="font-mono text-sm text-accent-fg print:hidden">
            <span aria-hidden="true">$ </span>cat cv.md
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{profile.name}</h1>
          <p className="font-mono text-sm text-fg sm:text-base">{profile.headline}</p>
          <p className="inline-flex items-center gap-2 text-sm text-muted">
            <MapPinIcon aria-hidden="true" />
            {profile.location} · {profile.timezone} · {dict.hero.available.toLowerCase()}
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="link inline-flex items-center gap-2"
                  {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {link.icon}
                  {link.value}
                  {link.external ? <span className="sr-only"> {dict.a11y.newTab}</span> : null}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <ButtonLink
          href={siteConfig.cvPdf}
          icon={<DownloadIcon />}
          download
          className="shrink-0 print:hidden"
        >
          {dict.cv.download}
        </ButtonLink>
      </header>

      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_17rem] print:grid-cols-[minmax(0,1fr)_14rem]">
        <div className="flex flex-col gap-12">
          <CvSection title={dict.cv.summary}>
            <p className="text-lg leading-relaxed text-fg">{cv.summary}</p>
          </CvSection>

          <CvSection title={dict.cv.experience}>
            <ol className="flex flex-col gap-8">
              {cv.experience.map((job) => (
                <li key={`${job.role}-${job.organization}`} className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                    <h3 className="text-xl font-semibold tracking-tight">
                      {job.role} <span className="text-muted">· {job.organization}</span>
                    </h3>
                    <p className="shrink-0 font-mono text-xs text-muted">{job.period}</p>
                  </div>
                  <p className="font-mono text-xs text-muted">{job.context}</p>
                  <ul className="flex flex-col gap-2 text-fg">
                    {job.highlights.map((item) => (
                      <li key={item.slice(0, 40)} className="flex gap-3">
                        <span aria-hidden="true" className="mt-1 font-mono text-accent-fg">
                          ›
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </CvSection>

          <CvSection title={dict.cv.projects}>
            <ul className="grid gap-4 sm:grid-cols-2">
              {projects.map((project) => (
                <li key={project.slug} className="rounded-xl border border-border bg-surface p-4">
                  <Link href={project.url} className="link font-semibold">
                    {project.title}
                  </Link>
                  <p className="mt-1 text-sm text-muted">{project.summary}</p>
                  <p className="mt-2 font-mono text-xs text-muted">{project.stack.join(' · ')}</p>
                </li>
              ))}
            </ul>
          </CvSection>
        </div>

        <aside className="flex flex-col gap-12">
          <CvSection title={dict.cv.skills}>
            <dl className="flex flex-col gap-4">
              {stack.map((group) => (
                <div key={group.area} className="flex flex-col gap-2">
                  <dt className="text-sm font-semibold">{group.area}</dt>
                  <dd>
                    <ul className="flex flex-wrap gap-1.5">
                      {group.items.map((item) => (
                        <li key={item}>
                          <Tag>{item}</Tag>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
          </CvSection>

          <CvSection title={dict.cv.education}>
            <ul className="flex flex-col gap-3">
              {cv.education.map((item) => (
                <li key={item.degree}>
                  <p className="font-semibold">{item.degree}</p>
                  <p className="text-sm text-muted">{item.institution}</p>
                  <p className="font-mono text-xs text-muted">{item.period}</p>
                </li>
              ))}
            </ul>
          </CvSection>

          <CvSection title={dict.cv.languages}>
            <dl className="flex flex-col gap-2">
              {cv.languages.map((language) => (
                <div key={language.name} className="flex justify-between gap-4 text-sm">
                  <dt className="font-semibold">{language.name}</dt>
                  <dd className="text-right text-muted">{language.level}</dd>
                </div>
              ))}
            </dl>
          </CvSection>
        </aside>
      </div>
    </Container>
  );
}
