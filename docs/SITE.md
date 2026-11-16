# Sitio personal — guía de mantenimiento

Portafolio, casos de estudio y blog técnico de Hector Márquez.

> El `README.md` de la raíz es el README del perfil de GitHub. No forma parte del sitio:
> esta guía es la documentación del proyecto.

## Stack

| Pieza               | Elección                                                        |
| ------------------- | --------------------------------------------------------------- |
| Framework           | Next.js 16 (App Router, Turbopack), React 19                    |
| Lenguaje            | TypeScript estricto (`strict`, `noUncheckedIndexedAccess`)      |
| Estilos             | Tailwind CSS 4 (tokens en `src/app/globals.css`) + Typography   |
| Contenido           | MDX con `@next/mdx`, frontmatter YAML validado con zod          |
| Resaltado de código | `rehype-pretty-code` + Shiki, en build (sin JS en el navegador) |
| Imágenes OG         | `next/og`, generadas en build para cada página                  |
| Calidad             | ESLint (config de Next) + Prettier (con plugin de Tailwind)     |

Todo el sitio es estático: no hay base de datos ni backend. Cada página se genera en `next build`.

**Por qué `@next/mdx`:** es la integración oficial de MDX para Next.js y se publica junto con
cada versión de Next, así que es la opción con mejor garantía de compatibilidad. El MDX se compila
en build y las páginas quedan como HTML estático. Lo que `@next/mdx` no trae (listados, frontmatter
tipado, borradores, tiempo de lectura, tabla de contenidos) lo resuelve una capa pequeña en
`src/lib/content/`.

## Requisitos

- Node.js 20.9 o superior (recomendado: 22).
- npm.

## Comandos

```bash
npm install            # instalar dependencias
npm run dev            # desarrollo en http://localhost:3000
npm run build          # build de producción
npm run start          # servir el build de producción
npm run lint           # ESLint
npm run typecheck      # TypeScript sin emitir archivos
npm run format         # formatear con Prettier
npm run content:pending # listar los [COMPLETAR] / [CONFIRMAR] pendientes
```

Antes de hacer push conviene correr `npm run lint && npm run typecheck && npm run build`.

## Estructura

```text
content/es/
  blog/*.mdx              artículos
  proyectos/*.mdx         casos de estudio
public/                   archivos estáticos (CV en PDF, imágenes)
scripts/                  utilidades (content-pending.mjs)
src/
  app/                    rutas (App Router)
    page.tsx              inicio
    proyectos/            listado y /proyectos/[slug]
    blog/                 listado, /blog/[slug] y /blog/tags/[tag]
    cv/                   CV web
    rss.xml/              feed RSS
    sitemap.ts robots.ts manifest.ts
    opengraph-image.tsx   imagen OG por defecto (+ una por artículo y por proyecto)
  components/             componentes (layout, ui, home, blog, projects, mdx, seo)
  config/site.ts          correo, redes, ruta del PDF del CV
  data/es/                textos de presentación, stack y CV
  i18n/                   configuración de idiomas y diccionario de textos de interfaz
  lib/content/            lectura y validación del contenido MDX
  mdx-components.tsx      componentes disponibles dentro de los MDX
docs/SITE.md              esta guía
```

## Qué se edita dónde

| Quiero cambiar…                                     | Archivo                       |
| --------------------------------------------------- | ----------------------------- |
| Correo, LinkedIn, GitHub, ruta del PDF              | `src/config/site.ts`          |
| Hero, "Sobre mí", datos rápidos, terminal del hero  | `src/data/es/profile.ts`      |
| Stack por área                                      | `src/data/es/stack.ts`        |
| Experiencia, educación e idiomas del CV             | `src/data/es/cv.ts`           |
| Textos de la interfaz (botones, títulos, etiquetas) | `src/i18n/dictionaries/es.ts` |
| Colores, tipografía, estilos del contenido          | `src/app/globals.css`         |
| Un caso de estudio o un artículo                    | `content/es/…/<slug>.mdx`     |

## CV en PDF

Copia tu archivo a `public/cv-hector-marquez.pdf`. Los botones "Descargar CV" del inicio y de
`/cv` ya apuntan ahí. Si quieres otro nombre, cambia `cvPdf` en `src/config/site.ts`.

## Agregar un artículo

1. Crea `content/es/blog/<slug>.mdx`. El nombre del archivo es la URL: `/blog/<slug>`.
   Usa minúsculas y guiones, sin tildes.
2. Empieza con este frontmatter:

   ```mdx
   ---
   title: Título del artículo
   description: Resumen de 1 o 2 frases (listado, buscadores y redes sociales).
   date: 2026-11-12
   tags:
     - nextjs
     - despliegue
   draft: true
   ---

   ## Primera sección

   Texto…
   ```

   | Campo         | Obligatorio | Notas                                           |
   | ------------- | ----------- | ----------------------------------------------- |
   | `title`       | sí          |                                                 |
   | `description` | sí          |                                                 |
   | `date`        | sí          | Formato `AAAA-MM-DD`. Ordena el listado.        |
   | `updated`     | no          | `AAAA-MM-DD`, si actualizas el artículo.        |
   | `tags`        | no          | Cada tag tiene su página en `/blog/tags/<tag>`. |
   | `draft`       | no          | `true` = borrador. Por defecto `false`.         |

   Si falta un campo obligatorio o tiene un formato incorrecto, `npm run build` falla y te dice
   qué archivo y qué campo revisar.

3. Escribe el contenido con títulos `##` y `###` (el título principal lo pone la página, no uses
   `#`). Con 3 o más secciones `##` aparece la tabla de contenidos.
4. Cuando esté listo, cambia `draft: false` y ajusta `date` al día de publicación.

### Borradores

| Entorno                   | ¿Se ven los borradores?             |
| ------------------------- | ----------------------------------- |
| `npm run dev`             | Sí, con la etiqueta "Borrador"      |
| Preview de Vercel (ramas) | Sí, con `noindex`                   |
| Producción                | No (ni en listados, sitemap ni RSS) |

Así puedes revisar un artículo en una rama de Vercel antes de publicarlo.

### Lo que puedes usar dentro del MDX

````mdx
Bloque de código con nombre de archivo y líneas resaltadas:

```ts title="server.ts" {2-3}
const app = express();
app.use(cors());
app.use(express.json());
```

<Callout type="tip" title="Dato">
  Texto destacado. Tipos: `nota`, `tip`, `aviso`.
</Callout>

<Figure
  src="/images/blog/mi-articulo/diagrama.webp"
  alt="Descripción de la imagen"
  width={1600}
  height={900}
  caption="Pie de foto opcional"
/>

Agrega `narrow` a <Figure> para capturas verticales, cuadradas o de móvil (se muestran más angostas y centradas).

{/* Comentario: no se muestra en el sitio. */}
````

- Guarda las imágenes en `public/images/blog/<slug>/`. Usa `<Figure>` con el `width` y el `height`
  reales para evitar saltos de diseño. La sintaxis `![alt](src)` también funciona, pero asume
  una imagen 16:9.
- Los links internos (`/proyectos/...`) navegan sin recargar; los externos se abren en una
  pestaña nueva.
- Prettier no formatea los `.mdx` a propósito: su parser no entiende MDX 3 y rompe los
  comentarios `{/* */}`.

## Agregar un caso de estudio

1. Crea `content/es/proyectos/<slug>.mdx` (URL: `/proyectos/<slug>`).
2. Frontmatter:

   ```mdx
   ---
   title: Nombre del proyecto
   summary: Una o dos frases sobre qué es.
   client: Cliente o contexto (país)
   year: '2024'
   role: Desarrollador full stack
   stack:
     - Next.js
     - PostgreSQL
   liveUrl: https://ejemplo.com
   repoUrl: https://github.com/hectorddev/repo
   links:
     - label: Panel de administración
       url: https://admin.ejemplo.com
   cover: /images/proyectos/<slug>/portada.webp
   coverAlt: Descripción de la captura
   featured: false
   order: 8
   status: en-produccion
   ---
   ```

   | Campo      | Obligatorio    | Notas                                                                                        |
   | ---------- | -------------- | -------------------------------------------------------------------------------------------- |
   | `title`    | sí             |                                                                                              |
   | `summary`  | sí             | Se usa en tarjetas, metadatos e imagen OG.                                                   |
   | `client`   | sí             | Cliente o contexto.                                                                          |
   | `year`     | sí             | Texto libre: `'2024'`, `'2021 – 2024'`.                                                      |
   | `role`     | sí             |                                                                                              |
   | `stack`    | sí             | Lista de tecnologías.                                                                        |
   | `liveUrl`  | no             | URL completa. Muestra el botón "Ver en vivo".                                                |
   | `repoUrl`  | no             | URL completa. Muestra el botón "Ver código".                                                 |
   | `links`    | no             | Enlaces extra con texto propio (`label` + `url`), p. ej. si el proyecto tiene varios sitios. |
   | `cover`    | no             | Ruta dentro de `public/`. Sin portada se muestra una tipográfica.                            |
   | `coverAlt` | si hay `cover` | Texto alternativo de la portada (accesibilidad).                                             |
   | `featured` | no             | `true` = aparece en "Proyectos destacados" del inicio.                                       |
   | `order`    | no             | Orden en los listados (menor primero).                                                       |
   | `status`   | no             | `en-produccion`, `beta` o `proximamente` (insignia en la tarjeta).                           |

3. Usa esta estructura de secciones:

   ```mdx
   ## Contexto

   ## Problema

   ## Mi rol

   ## Solución y arquitectura

   ## Retos técnicos

   ## Resultado
   ```

**Portadas:** exporta las capturas en `.webp`, idealmente de 1600×900 (16:9), y guárdalas en
`public/images/proyectos/<slug>/`. Si el archivo indicado en `cover` no existe, el build falla.

**Privacidad:** en los proyectos de clientes, y en especial en los del Sistema de Orquestas, no
publiques enlaces privados, nombres reales ni datos de estudiantes. Usa capturas con datos
ficticios.

## Pendientes antes de publicar

```bash
npm run content:pending
```

Lista cada `[COMPLETAR]` y `[CONFIRMAR]` del contenido y de `src/data/`. Con `-- --strict`
termina con error si queda alguno (útil si algún día lo agregas a CI).

## Desplegar en Vercel

Si el repositorio ya está conectado a Vercel (como el sitio anterior), sigue estos pasos. Si no,
impórtalo desde _Add New → Project_ en Vercel; detecta Next.js solo.

1. **Revisa la configuración del proyecto** en Vercel → _Settings_:
   - _Framework Preset_: **Next.js**.
   - _Build Command_, _Output Directory_ e _Install Command_: valores por defecto. Desactiva
     cualquier override que haya quedado del proyecto anterior.
   - _Node.js Version_: **22.x** o superior. Next 16 no funciona con Node 18 o anterior.
2. **Despliega una Preview:** cada push a una rama distinta de `master` (por ejemplo
   `nuevo-sitio`) crea una URL de Preview. Ahí se ven los borradores y no se indexa nada.
3. **Pasa a producción:** haz merge de la rama a `master`. Vercel despliega producción
   automáticamente.
4. **Dominio propio** (cuando lo tengas):
   1. Vercel → _Settings → Domains_ → agrega el dominio y configura el DNS que te indique.
   2. Vercel → _Settings → Environment Variables_ → agrega `NEXT_PUBLIC_SITE_URL` con la URL
      completa, por ejemplo `https://tu-dominio.com`, en el entorno _Production_.
   3. Haz un redeploy. Canonical, sitemap, RSS e imágenes OG pasan a usar el dominio nuevo.

   Sin esa variable, el sitio usa el dominio de producción que asigna Vercel
   (`VERCEL_PROJECT_PRODUCTION_URL`).

### Comprobar después de desplegar

- `https://<dominio>/sitemap.xml`, `/robots.txt` y `/rss.xml` responden.
- Pega una URL de un proyecto en <https://www.opengraph.xyz> para ver la imagen OG.
- Lighthouse (DevTools de Chrome → Lighthouse) en móvil y escritorio.

## Agregar inglés más adelante

El código ya separa los textos por idioma:

1. Crea `src/i18n/dictionaries/en.ts` con el tipo `Dictionary`. TypeScript avisa si falta alguna
   clave.
2. Agrega `'en'` a `locales` en `src/i18n/config.ts` y registra el diccionario en
   `src/i18n/index.ts`.
3. Crea `src/data/en/` (perfil, stack, CV) y regístralo en `src/data/index.ts`.
4. Traduce el contenido en `content/en/blog` y `content/en/proyectos`. Los loaders ya reciben el
   idioma como parámetro.
5. Mueve las rutas de `src/app/` a `src/app/[locale]/` y agrega un `proxy.ts` para detectar el
   idioma, o deja el español en `/` y el inglés bajo `/en`.
