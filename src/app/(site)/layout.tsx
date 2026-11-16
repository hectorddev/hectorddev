import type { ReactNode } from 'react';
import { SiteShell } from '@/components/layout/site-shell';
import '../globals.css';

export default function SiteLayout({ children }: { children: ReactNode }) {
  return <SiteShell>{children}</SiteShell>;
}
