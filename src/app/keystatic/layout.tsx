import type { Metadata } from 'next';
import KeystaticApp from './keystatic';

export const metadata: Metadata = {
  title: 'Panel de contenido',
  robots: { index: false, follow: false },
};

/** Panel para escribir artículos sin tocar el código. */
export default function KeystaticLayout() {
  return <KeystaticApp />;
}
