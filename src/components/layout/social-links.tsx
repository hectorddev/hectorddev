import type { ReactNode } from 'react';
import { GithubIcon, LinkedinIcon, MailIcon } from '@/components/icons';
import { siteConfig } from '@/config/site';
import type { Dictionary } from '@/i18n';

export type SocialLink = {
  href: string;
  label: string;
  /** Texto visible, p. ej. el correo o el usuario. */
  value: string;
  icon: ReactNode;
  external: boolean;
};

export function getSocialLinks(dict: Dictionary): SocialLink[] {
  return [
    {
      href: `mailto:${siteConfig.email}`,
      label: dict.contact.email,
      value: siteConfig.email,
      icon: <MailIcon />,
      external: false,
    },
    {
      href: siteConfig.links.linkedin,
      label: dict.contact.linkedin,
      value: 'in/hectordmv',
      icon: <LinkedinIcon />,
      external: true,
    },
    {
      href: siteConfig.links.github,
      label: dict.contact.github,
      value: `@${siteConfig.handle}`,
      icon: <GithubIcon />,
      external: true,
    },
  ];
}
