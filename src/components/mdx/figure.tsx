import { readFileSync } from 'node:fs';
import path from 'node:path';
import { imageSize } from 'image-size';
import Image from 'next/image';
import type { ComponentPropsWithoutRef } from 'react';

const sizes = '(min-width: 768px) 720px, 100vw';
const imageClass = 'h-auto w-full rounded-xl border border-border';

type FigureProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  /** Más angosta y centrada: para capturas verticales, cuadradas o de móvil. */
  narrow?: boolean;
};

/**
 * Imagen con dimensiones reales (evita saltos de diseño) y pie opcional.
 * Uso en MDX: <Figure src="/images/..." alt="..." width={1600} height={900} caption="..." />
 */
export function Figure({ src, alt, width, height, caption, narrow }: FigureProps) {
  return (
    <figure className={narrow ? 'mx-auto max-w-sm' : undefined}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={narrow ? '384px' : sizes}
        className={imageClass}
      />
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

/**
 * Imágenes en sintaxis Markdown `![alt](src)`, por ejemplo las que se suben
 * desde el panel. Si la imagen está en /public se leen sus dimensiones reales
 * (evita saltos de diseño); si no, se asume 16:9.
 */
export function MdxImage({ src, alt, width, height }: ComponentPropsWithoutRef<'img'>) {
  if (typeof src !== 'string') return null;
  const size = width && height ? null : readPublicImageSize(src);
  return (
    <Image
      src={src}
      alt={alt ?? ''}
      width={Number(width) || size?.width || 1600}
      height={Number(height) || size?.height || 900}
      sizes={sizes}
      className={imageClass}
    />
  );
}

function readPublicImageSize(src: string): { width: number; height: number } | null {
  if (!src.startsWith('/')) return null;
  try {
    const { width, height } = imageSize(readFileSync(path.join(process.cwd(), 'public', src)));
    return width && height ? { width, height } : null;
  } catch {
    return null;
  }
}
