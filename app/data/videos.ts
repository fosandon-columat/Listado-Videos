export interface Video {
  id: number;
  title: string;
  description: string;
  url: string;
  category: string;
  subcategory?: string;
}

export const categories: string[] = [
  'General',
  'Onboarding',
  'Instalaciones',
  'Applocker',
  'Recursos Humanos',
  'Reservas'
];

export const subcategories: string[] = [
  'Logística',
  'Parcel',
  'Mantenimiento',
  'Gestión',
  'Configuración',
  'General'
];

export const videos: Video[] = [
  {
    id: 1,
    title: 'Instalación de App Locker Logistic',
    description: 'Instalar app locker Logistic, en un ordenador planchado con error de usuario fantasma.',
    url: 'https://drive.google.com/file/d/1rlLaxxN35jU5yT0olF6slJfO0m3r2LGn/view?usp=sharing',
    category: 'Applocker'
  },
  {
    id: 2,
    title: 'Actualizar 3.1 Parcel',
    description: 'Paso a paso para actualizar a la versión 3.1 de Parcel.',
    url: 'https://drive.google.com/file/d/16bkuRHrTvV6JNwk9lgP24YLW3SsCK9aM/view?usp=sharing',
    category: 'Applocker'
  },
  {
    id: 3,
    title: 'Reservas',
    description: 'Capacitación sobre la lógica de reservas.',
    url: 'https://drive.google.com/file/d/1T8qouAJEjwmpLASFpIO2IOz_IZoJkIrN/view?usp=sharing',
    category: 'Reservas'
  },
  
];
