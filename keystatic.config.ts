import { collection, config, fields } from '@keystatic/core';
import { wrapper } from '@keystatic/core/content-components';

/**
 * Panel de contenido en /keystatic.
 *
 * - En desarrollo (`npm run dev`) guarda directamente en los archivos del repo.
 * - En producción guarda haciendo commits en GitHub; solo pueden entrar
 *   cuentas con permiso de escritura en el repositorio.
 *   Para probar el modo GitHub en local: NEXT_PUBLIC_KEYSTATIC_STORAGE=github
 *
 * Los artículos se guardan en content/es/blog/<slug>.mdx con el mismo
 * frontmatter que valida src/lib/content/schemas.ts.
 */
const useGithub =
  process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE === 'github';

export default config({
  storage: useGithub
    ? { kind: 'github', repo: { owner: 'hectorddev', name: 'hectorddev' } }
    : { kind: 'local' },
  ui: {
    brand: { name: '~/hectorddev' },
    navigation: { Blog: ['posts'] },
  },
  collections: {
    posts: collection({
      label: 'Artículos del blog',
      slugField: 'title',
      path: 'content/es/blog/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      columns: ['title', 'date'],
      schema: {
        title: fields.slug({
          name: { label: 'Título', validation: { isRequired: true } },
          slug: {
            label: 'URL del artículo',
            description: 'Se genera a partir del título. No la cambies después de publicar.',
          },
        }),
        description: fields.text({
          label: 'Descripción',
          description:
            'Una o dos frases. Se usa en el listado, en buscadores y al compartir el artículo.',
          multiline: true,
          validation: { length: { min: 1, max: 300 } },
        }),
        date: fields.date({
          label: 'Fecha de publicación',
          defaultValue: { kind: 'today' },
          validation: { isRequired: true },
        }),
        updated: fields.date({
          label: 'Fecha de actualización',
          description: 'Opcional. Úsala si actualizas un artículo ya publicado.',
        }),
        tags: fields.array(fields.text({ label: 'Tag', validation: { length: { min: 1 } } }), {
          label: 'Tags',
          itemLabel: (props) => props.value,
        }),
        draft: fields.checkbox({
          label: 'Borrador',
          description:
            'Mientras esté marcado, el artículo no aparece en producción (sí en desarrollo y en los Preview de Vercel).',
          defaultValue: true,
        }),
        content: fields.mdx({
          label: 'Contenido',
          extension: 'mdx',
          options: {
            heading: [2, 3, 4],
            image: { directory: 'public/images/blog', publicPath: '/images/blog/' },
          },
          components: {
            Callout: wrapper({
              label: 'Nota destacada',
              schema: {
                type: fields.select({
                  label: 'Tipo',
                  options: [
                    { label: 'Nota', value: 'nota' },
                    { label: 'Tip', value: 'tip' },
                    { label: 'Aviso', value: 'aviso' },
                  ],
                  defaultValue: 'nota',
                }),
                title: fields.text({ label: 'Título (opcional)' }),
              },
            }),
          },
        }),
      },
    }),
  },
});
