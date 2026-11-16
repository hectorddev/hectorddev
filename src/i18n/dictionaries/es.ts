/**
 * Textos de interfaz en español. Para agregar inglés, crea `en.ts` con el
 * tipo `Dictionary`: TypeScript avisará si falta alguna clave.
 */
export const es = {
  meta: {
    siteName: 'Hector Márquez',
    siteTitle: 'Hector Márquez — Desarrollador Full Stack',
    siteDescription:
      'Desarrollador Full Stack con 7 años construyendo plataformas web, e-commerce y sistemas de gestión con React, Next.js, Node.js y AWS. Portafolio, casos de estudio y blog técnico.',
  },
  a11y: {
    skipToContent: 'Saltar al contenido',
    mainNav: 'Navegación principal',
    footerNav: 'Enlaces del pie de página',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    darkMode: 'Modo oscuro',
    newTab: '(se abre en una pestaña nueva)',
    homeLink: 'ir al inicio',
  },
  nav: {
    home: 'Inicio',
    projects: 'Proyectos',
    blog: 'Blog',
    cv: 'CV',
    contact: 'Contacto',
  },
  hero: {
    greeting: 'Hola, soy',
    ctaProjects: 'Ver proyectos',
    ctaCv: 'Descargar CV',
    ctaContact: 'Contacto',
    available: 'Disponible para trabajo remoto',
  },
  home: {
    aboutLabel: 'sobre-mí',
    aboutTitle: 'Sobre mí',
    stackLabel: 'stack',
    stackTitle: 'Con qué trabajo',
    featuredLabel: 'proyectos',
    featuredTitle: 'Proyectos destacados',
    featuredAll: 'Ver todos los proyectos',
    postsLabel: 'blog',
    postsTitle: 'Últimos artículos',
    postsAll: 'Ver todo el blog',
    contactLabel: 'contacto',
  },
  projects: {
    title: 'Proyectos',
    description:
      'Casos de estudio de plataformas web, e-commerce y sistemas de gestión que he construido para clientes en Chile y Venezuela.',
    intro:
      'La mayor parte de mi trabajo es para clientes y vive en repositorios privados. Aquí cuento el contexto, el problema y cómo lo resolví.',
    client: 'Cliente / contexto',
    year: 'Año',
    role: 'Rol',
    stack: 'Stack',
    live: 'Ver en vivo',
    repo: 'Ver código',
    readCase: 'Leer caso de estudio',
    back: 'Todos los proyectos',
    others: 'Otros proyectos',
    status: {
      'en-produccion': 'En producción',
      beta: 'Beta',
      proximamente: 'Próximamente',
    },
  },
  blog: {
    title: 'Blog',
    description:
      'Artículos técnicos sobre desarrollo full stack: React, Next.js, Node.js, bases de datos y despliegue.',
    intro: 'Notas sobre lo que construyo, los problemas que encuentro y cómo los resuelvo.',
    empty: 'Todavía no hay artículos publicados. Vuelve pronto.',
    allTags: 'Todos',
    filterByTag: 'Filtrar por tag',
    tagTitle: (tag: string) => `Artículos sobre #${tag}`,
    tagDescription: (tag: string) => `Artículos del blog etiquetados con #${tag}.`,
    readingTime: (minutes: number) => `${minutes} min de lectura`,
    draft: 'Borrador',
    toc: 'En este artículo',
    previous: 'Anterior',
    next: 'Siguiente',
    backToBlog: 'Volver al blog',
    rss: 'Suscríbete por RSS',
    updated: 'Actualizado',
  },
  cv: {
    title: 'CV',
    description:
      'Currículum de Hector Márquez, Desarrollador Full Stack: experiencia, proyectos, habilidades y educación.',
    download: 'Descargar PDF',
    summary: 'Perfil',
    experience: 'Experiencia',
    projects: 'Proyectos seleccionados',
    skills: 'Habilidades',
    education: 'Educación',
    languages: 'Idiomas',
  },
  contact: {
    title: '¿Hablamos?',
    text: 'Busco sumarme a un equipo en remoto. Si tienes una vacante o un proyecto en el que pueda aportar, escríbeme.',
    email: 'Correo',
    linkedin: 'LinkedIn',
    github: 'GitHub',
  },
  code: {
    copy: 'Copiar código',
    copied: 'Copiado',
  },
  footer: {
    madeIn: 'Compuesto en San Cristóbal, Venezuela.',
    builtWith: 'Hecho con Next.js y MDX.',
    source: 'Código del sitio',
  },
  notFound: {
    title: 'Página no encontrada',
    text: 'Esta página está en silencio: no existe o se movió.',
    back: 'Volver al inicio',
  },
};

export type Dictionary = typeof es;
