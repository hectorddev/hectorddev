'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { CloseIcon, MenuIcon } from '@/components/icons';
import { cn } from '@/lib/cn';
import { isActive, type NavItem } from './nav-items';

type MobileNavProps = {
  items: NavItem[];
  labels: { nav: string; open: string; close: string };
};

export function MobileNav({ items, labels }: MobileNavProps) {
  const pathname = usePathname();
  // Guardar en qué ruta se abrió: al navegar a otra ruta el menú se cierra solo.
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const open = openedAt === pathname;
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpenedAt(null);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="menu-movil"
        aria-label={open ? labels.close : labels.open}
        onClick={() => setOpenedAt(open ? null : pathname)}
        className="inline-flex size-11 items-center justify-center rounded-lg text-xl text-fg transition-colors hover:bg-surface-2"
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>

      <nav
        id="menu-movil"
        aria-label={labels.nav}
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-border bg-bg/95 shadow-lg backdrop-blur-md"
      >
        <ul className="mx-auto flex max-w-5xl flex-col px-5 py-3 sm:px-8">
          {items.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpenedAt(null)}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'flex min-h-12 items-center font-mono text-base',
                    active ? 'text-accent-fg' : 'text-fg',
                  )}
                >
                  <span aria-hidden="true" className="mr-2 text-muted">
                    {active ? '>' : '$'}
                  </span>
                  {item.label.toLowerCase()}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
