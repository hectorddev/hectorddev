/**
 * Versión web resumida del CV. Lo marcado con [COMPLETAR] se muestra tal
 * cual en el sitio hasta que lo reemplaces (ver `npm run content:pending`).
 */
export type CvExperience = {
  role: string;
  organization: string;
  context: string;
  period: string;
  highlights: string[];
};

export const cv = {
  summary:
    'Desarrollador Full Stack e Ingeniero en Informática con 7 años de experiencia construyendo plataformas web, e-commerce y sistemas de gestión para clientes en Chile y Venezuela, principalmente como freelance y como desarrollador subcontratado. Trabajo con React, Next.js, Node.js y AWS, y me gusta llevar un producto desde la primera versión hasta producción. Busco sumarme a un equipo en remoto.',

  // Si quieres, separa esta entrada por cliente o empresa, cada una con sus fechas.
  experience: [
    {
      role: 'Desarrollador Full Stack',
      organization: 'Freelance y subcontratado',
      context: 'Remoto · clientes en Chile y Venezuela',
      period: '[COMPLETAR: periodo]',
      highlights: [
        'FSM SpA (Chile), como subcontratado de SkyAds: sitio corporativo (fsmspa.com) y verificador público de certificados por RUT (certificate.fsmspa.com) en Next.js; la plataforma evolucionó a una intranet de e-learning con frontends independientes para administración, coaches, estudiantes y autenticación.',
        'Constructor Center (Chile): e-commerce de ferretería y materiales de construcción (constructorcenter.cl) con catálogo por sucursal, gestión de ofertas e integración de pasarela de pago.',
        'Alma Llanera Táchira: sistema en producción de reportes semanales y asistencia para la orquesta regional, con panel de coordinación.',
        'Nueva Copiapó (Chile): sitio web del operador del transporte público eléctrico de Copiapó (nuevacopiapo.cl), con sección de noticias y panel de administración interno.',
        'Knits and Weaves (Chile): tienda en Shopify, desarrollo y personalización.',
      ],
    },
  ] satisfies CvExperience[],

  education: [
    {
      degree: 'Ingeniería en Informática',
      institution: '[COMPLETAR: universidad]',
      period: '[COMPLETAR: año]',
    },
  ],

  languages: [
    { name: 'Español', level: 'Nativo' },
    { name: 'Inglés', level: '[COMPLETAR: nivel]' },
  ],
};
