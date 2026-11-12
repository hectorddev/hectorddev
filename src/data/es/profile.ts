/** Datos de presentación (inicio). Solo información confirmada. */
export const profile = {
  name: 'Hector Márquez',
  role: 'Desarrollador Full Stack',
  headline: 'Desarrollador Full Stack · React · Next.js · Node.js · AWS',
  valueProp: {
    before: 'Llevo productos web ',
    highlight: 'desde la primera versión hasta producción',
    after: ', donde los usa gente real.',
  },
  location: 'San Cristóbal, Venezuela',
  timezone: 'UTC−4',
  facts: [
    { label: 'Ubicación', value: 'San Cristóbal, Venezuela (UTC−4)' },
    { label: 'Experiencia', value: '7 años' },
    { label: 'Modalidad', value: 'Remoto' },
    { label: 'Formación', value: 'Ingeniero en Informática' },
  ],
  about: [
    'Soy Ingeniero en Informática y llevo 7 años construyendo plataformas web, e-commerce y sistemas de gestión para clientes en Chile y Venezuela, principalmente como freelance y como desarrollador subcontratado.',
    'Me gusta llevar un producto desde la primera versión hasta que está en producción y lo usa gente real: una intranet de e-learning para el sector minero, un e-commerce con pasarela de pago o el sistema con el que una orquesta regional centraliza sus reportes cada semana. Hoy busco sumarme a un equipo en remoto.',
    'Fuera del código soy músico: estudio música desde los 8 años, toco piano, guitarra y mandolina, y compongo música orquestal. La música me enseñó disciplina para aprender y la importancia de la armonía en un equipo.',
  ],
  /** Líneas de la "terminal" del hero (decorativa: la misma información está en "Sobre mí"). */
  terminal: [
    { command: 'whoami', output: 'hector · desarrollador full stack' },
    { command: 'cat experiencia.txt', output: '7 años · web, e-commerce y sistemas de gestión' },
    { command: 'ls clientes/', output: 'chile/  venezuela/' },
    {
      command: 'cat fuera-del-codigo.txt',
      output: 'piano · guitarra · mandolina · composición orquestal',
    },
  ],
};
