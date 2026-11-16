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
 * Imágenes en sintaxis Markdown `![alt](src)`. Sin dimensiones conocidas se
 * asume 16:9; para capturas usa mejor <Figure> con width y height reales.
 */
export function MdxImage({ src, alt, width, height }: ComponentPropsWithoutRef<'img'>) {
  if (typeof src !== 'string') return null;
  return (
    <Image
      src={src}
      alt={alt ?? ''}
      width={Number(width) || 1600}
      height={Number(height) || 900}
      sizes={sizes}
      className={imageClass}
    />
  );
}
