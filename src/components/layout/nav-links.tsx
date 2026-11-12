'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/cn';
import { isActive, type NavItem } from './nav-items';

export function NavLinks({ items, label }: { items: NavItem[]; label: string }) {
  const pathname = usePathname();

  return (
    <nav aria-label={label} className="hidden md:block">
      <ul className="flex items-center gap-1">
        {items.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'relative rounded-md px-3 py-2 font-mono text-sm transition-colors after:absolute after:inset-x-3 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-accent-fg after:transition-transform after:duration-300 hover:after:scale-x-100 motion-reduce:after:transition-none',
                  active ? 'text-fg' : 'text-muted hover:text-fg',
                )}
              >
                {active ? (
                  <span aria-hidden="true" className="text-accent-fg">
                    ./
                  </span>
                ) : null}
                {item.label.toLowerCase()}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
