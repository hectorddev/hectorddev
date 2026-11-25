/** Datos de presentación (inicio). Solo información confirmada. */
export const profile = {
  name: 'Hector Márquez',
  role: 'Desarrollador Full Stack',
  headline: 'Full-Stack Developer | React · Next.js · TypeScript · Node.js',
  valueProp: {
    before: 'Construyo aplicaciones web y móviles ',
    highlight: 'que resuelven problemas reales',
    after: '.',
  },
  heroBio: [
    'Soy Ingeniero Informático con más de 5 años de experiencia desarrollando plataformas, e-commerce y sistemas de gestión para clientes en Latinoamérica.',
    'He trabajado en productos en producción, desde la implementación de funcionalidades hasta su mantenimiento y evolución.',
  ],
  location: 'San Cristóbal, Venezuela',
  timezone: 'UTC−4',
  facts: [
    { label: 'Ubicación', value: 'San Cristóbal, Venezuela (UTC−4)' },
    { label: 'Experiencia', value: '5+ años' },
    { label: 'Modalidad', value: 'Remoto' },
    { label: 'Formación', value: 'Ingeniero en Informática' },
  ],
  about: [
    'Soy Ingeniero en Informática y llevo 5+ años construyendo plataformas web, e-commerce y sistemas de gestión para clientes en Chile y Venezuela, principalmente como freelance y como desarrollador subcontratado.',
    'Me gusta llevar un producto desde la primera versión hasta que está en producción y lo usa gente real: una intranet de e-learning para el sector minero, un e-commerce con pasarela de pago o el sistema con el que una orquesta regional centraliza sus reportes cada semana. Hoy busco sumarme a un equipo en remoto.',
    'Fuera del código soy músico: estudio música desde los 8 años, toco piano, guitarra y mandolina, y compongo música orquestal. La música me enseñó disciplina para aprender y la importancia de la armonía en un equipo.',
  ],
  /** Líneas de la "terminal" del hero (decorativa: la misma información está en "Sobre mí"). */
  terminal: [
    { command: 'whoami', output: 'hector · desarrollador full stack' },
    { command: 'cat experiencia.txt', output: '5+ años · web, e-commerce y sistemas de gestión' },
    { command: 'ls clientes/', output: 'chile/  venezuela/' },
    {
      command: 'cat fuera-del-codigo.txt',
      output: 'piano · guitarra · mandolina · composición orquestal',
    },
  ],
};
