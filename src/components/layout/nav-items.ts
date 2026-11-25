import type { Dictionary } from '@/i18n';

export type NavItem = { href: string; label: string };

export function getNavItems(dict: Dictionary): NavItem[] {
  return [
    { href: '/proyectos', label: dict.nav.projects },
    { href: '/cv', label: dict.nav.cv },
    { href: '/#contacto', label: dict.nav.contact },
  ];
}

export function isActive(pathname: string, href: string): boolean {
  if (href.includes('#')) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}
