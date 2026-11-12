import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';
import { siteConfig } from '@/config/site';
import { getSiteData } from '@/data';

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = 'image/png';

const FONTS_DIR = path.join(process.cwd(), 'src/assets/fonts');

const colors = {
  bg: '#0b0d10',
  surface: '#13161b',
  border: '#252a32',
  fg: '#e7e9ec',
  muted: '#9ba3ae',
  accent: '#c5f23a',
  onAccent: '#101318',
};

async function loadFonts() {
  const [display, mono] = await Promise.all([
    readFile(path.join(FONTS_DIR, 'bricolage-grotesque-latin-800-normal.woff')),
    readFile(path.join(FONTS_DIR, 'jetbrains-mono-latin-500-normal.woff')),
  ]);
  return [
    { name: 'Display', data: display, weight: 800 as const, style: 'normal' as const },
    { name: 'Mono', data: mono, weight: 500 as const, style: 'normal' as const },
  ];
}

type OgImageInput = {
  /** Ruta tipo terminal mostrada arriba, p. ej. `blog/mi-articulo`. */
  path: string;
  /** Etiqueta en mono sobre el título, p. ej. "blog" o "caso de estudio". */
  kicker: string;
  title: string;
  description?: string;
  tags?: string[];
};

/** Recorta en el último espacio para no partir palabras. */
function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[,.;:]$/, '')}…`;
}

function fitTitle(title: string): number {
  if (title.length > 70) return 54;
  if (title.length > 45) return 64;
  return 76;
}

/** Imagen OG con la estética del sitio (terminal oscura + acento lima). */
export async function renderOgImage({
  path: route,
  kicker,
  title,
  description,
  tags,
}: OgImageInput) {
  const fonts = await loadFonts();

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: colors.bg,
        backgroundImage: `radial-gradient(${colors.border} 1.5px, transparent 1.5px)`,
        backgroundSize: '28px 28px',
        padding: 48,
        fontFamily: 'Mono',
        color: colors.fg,
      }}
    >
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          border: `2px solid ${colors.border}`,
          borderRadius: 24,
          backgroundColor: colors.surface,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '20px 28px',
            borderBottom: `2px solid ${colors.border}`,
            fontSize: 22,
            color: colors.muted,
          }}
        >
          <div style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: colors.border }} />
          <div style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: colors.border }} />
          <div style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: colors.accent }} />
          <div style={{ marginLeft: 12, display: 'flex' }}>
            ~/{siteConfig.handle}/{route}
          </div>
        </div>

        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '0 56px',
            gap: 20,
          }}
        >
          <div style={{ display: 'flex', fontSize: 26, color: colors.accent }}>
            {`// ${kicker}`}
          </div>
          <div
            style={{
              display: 'flex',
              fontFamily: 'Display',
              fontSize: fitTitle(title),
              lineHeight: 1.05,
              letterSpacing: -1.5,
              color: colors.fg,
            }}
          >
            {title}
          </div>
          {description ? (
            <div
              style={{
                display: 'flex',
                fontSize: 24,
                lineHeight: 1.4,
                color: colors.muted,
              }}
            >
              {truncate(description, 130)}
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '22px 56px',
            borderTop: `2px solid ${colors.border}`,
            fontSize: 22,
          }}
        >
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <div
              style={{
                display: 'flex',
                backgroundColor: colors.accent,
                color: colors.onAccent,
                padding: '4px 12px',
                borderRadius: 8,
              }}
            >
              {siteConfig.name}
            </div>
            <div style={{ display: 'flex', color: colors.muted }}>{getSiteData().profile.role}</div>
          </div>
          <div style={{ display: 'flex', gap: 10, color: colors.muted }}>
            {(tags ?? []).slice(0, 3).map((tag) => (
              <div key={tag} style={{ display: 'flex' }}>
                #{tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>,
    { ...ogSize, fonts },
  );
}
