import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

/** Icono para iOS: el mismo símbolo de terminal que icon.svg. */
export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0b0d10',
      }}
    >
      <svg width="180" height="180" viewBox="0 0 64 64">
        <path
          d="M17 21 L29 32 L17 43"
          fill="none"
          stroke="#c5f23a"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="33" y="39" width="15" height="6" rx="3" fill="#c5f23a" />
      </svg>
    </div>,
    size,
  );
}
