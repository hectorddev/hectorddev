# Instrucciones del repositorio

Este archivo define las reglas y convenciones para agentes que trabajen en este repositorio (`hectorddev`).

## Flujo de Git

- En este repositorio está permitido hacer commit y push de cambios directamente a la rama `master`.
- Antes de subir cambios a `master`, ejecutar y verificar que pasen sin errores:
  - `npm run format:check`
  - `npm run lint`
  - `npm run typecheck`
  - `npm run build`
- Usar mensajes de commit concisos en estilo Conventional Commits en español (por ejemplo: `feat(hero): ...`, `fix(...): ...`, `docs: ...`).

## Referencia del proyecto

- Stack: Next.js 16 (App Router, Turbopack), React 19, TypeScript estricto, Tailwind CSS 4 y MDX (`@next/mdx`).
- Guía de mantenimiento y mapa de archivos: consultar `docs/SITE.md`.
- Textos de presentación (hero, sobre mí, terminal): `src/data/es/profile.ts`.
- Textos de interfaz e idioma: `src/i18n/dictionaries/es.ts`.
