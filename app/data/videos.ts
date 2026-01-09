export interface Video {
  id: number;
  title: string;
  description: string;
  url: string;
  category: string;
}

export const categories: string[] = [
  'General',
  'Onboarding',
  'Instalaciones',
  'Seguridad',
  'Recursos Humanos'
];

export const videos: Video[] = [
  {
    id: 1,
    title: 'Instalación de App Locker Logistic',
    description: 'Instalar app locker Logistic, en un ordenador planchado con error de usuario fantasma.',
    url: 'https://drive.google.com/file/d/1rlLaxxN35jU5yT0olF6slJfO0m3r2LGn/view?usp=sharing',
    category: 'Instalaciones'
  },
  {
    id: 2,
    title: 'Configuración del correo',
    description: 'Paso a paso para configurar tu correo corporativo.',
    url: 'https://drive.google.com/icon?id=2',
    category: 'Herramientas'
  },
  {
    id: 3,
    title: 'Normas de Convivencia',
    description: 'Reglas básicas para el uso de espacios comunes.',
    url: 'https://drive.google.com/icon?id=3',
    category: 'Onboarding'
  },
  {
    id: 4,
    title: 'Protocolo de Seguridad',
    description: 'Qué hacer en caso de emergencia.',
    url: 'https://drive.google.com/icon?id=4',
    category: 'Seguridad'
  },
   {
    id: 5,
    title: 'Beneficios y Compensaciones',
    description: 'Explicación detallada de los beneficios laborales.',
    url: 'https://drive.google.com/icon?id=5',
    category: 'Recursos Humanos'
  },
   {
    id: 6,
    title: 'Uso de Slack',
    description: 'Cómo comunicarse efectivamente usando Slack.',
    url: 'https://drive.google.com/icon?id=6',
    category: 'Herramientas'
  }
];
