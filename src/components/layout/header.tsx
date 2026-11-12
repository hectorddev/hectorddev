import { Container } from '@/components/ui/container';
import type { Dictionary } from '@/i18n';
import { Logo } from './logo';
import { MobileNav } from './mobile-nav';
import { NavLinks } from './nav-links';
import { getNavItems } from './nav-items';
import { ThemeToggle } from './theme-toggle';

export function Header({ dict }: { dict: Dictionary }) {
  const items = getNavItems(dict);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-bg/80 backdrop-blur-md supports-[backdrop-filter]:bg-bg/70">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Logo label={dict.a11y.homeLink} />
        <div className="flex items-center gap-1">
          <NavLinks items={items} label={dict.a11y.mainNav} />
          <ThemeToggle label={dict.a11y.darkMode} />
          <MobileNav
            items={items}
            labels={{
              nav: dict.a11y.mainNav,
              open: dict.a11y.openMenu,
              close: dict.a11y.closeMenu,
            }}
          />
        </div>
      </Container>
    </header>
  );
}
