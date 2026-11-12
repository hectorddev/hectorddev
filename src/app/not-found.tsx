import type { Metadata } from 'next';
import { ArrowLeftIcon } from '@/components/icons';
import { ButtonLink } from '@/components/ui/button-link';
import { Container } from '@/components/ui/container';
import { getDictionary } from '@/i18n';

const dict = getDictionary();

export const metadata: Metadata = {
  title: dict.notFound.title,
  robots: { index: false },
};

export default function NotFound() {
  return (
    <Container size="narrow" className="py-24 sm:py-32">
      <p className="font-mono text-sm text-accent-fg">
        <span aria-hidden="true">$ </span>curl -I este-enlace → 404
      </p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">{dict.notFound.title}</h1>
      <p className="mt-4 text-lg text-muted">{dict.notFound.text}</p>
      <ButtonLink
        href="/"
        variant="secondary"
        className="mt-10"
        icon={<ArrowLeftIcon />}
        iconPosition="start"
      >
        {dict.notFound.back}
      </ButtonLink>
    </Container>
  );
}
