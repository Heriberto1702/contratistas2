// src/service/coursesServices.ts

import { Course } from '../types/course';

// Simulación de datos para cursos, secciones y módulos
const coursesData: Course[] = [
  {
    id: '1',
    title: 'Instalaciones electricas básicas domiciliarias',
    especialista:'Oscar López',
    rubro:'Electricidad',
    inicio:'09/09/2024',
    fin:'10/09/2024',
    hora:'19.00',
    image:'/curso1.png',
    description: 'Aprende gypsum desde cero.',
    recomendaciones:`<p>Bienvenido/a Academia para Contratista.</p>
    <p>Esta capacitación se imparte de manera presencial en la tienda indicada en el título de esta.</p>
    <p>Para que tenga una mejor experiencia de capacitación le entregamos las siguientes recomendaciones:</p>
    <ul>
    <li>Llegar con al menos 5 minutos de anticipación a la hora pautada de la capacitación.</li>
    <li>Llevar cuaderno y lápiz para anotar lo que necesite.</li>
    <li>Al llegar a tienda consultar hacía donde se debe dirigir para participar en la capacitación con el capitán del Círculo de Especialistas o en el módulo de información.</li>
    <li>Si tiene dudas previas acerca de la temática o la marca puede verlo en la charla en conjunto al relator.</li>
    <li>Recuerde que son cupos limitados por orden de llegada, por lo que si llega tarde a la actividad corre el riesgo de que no pueda ingresar.</li>
    </ul>
    <p>Si tiene más dudas comuníquese con nuestro Call Center al: 225735xxx – 80091xxx7 o por nuestro Whatsapp +505 99129xxx.</p>
    <p>Esperamos que tenga una muy buena experiencia de capacitación junto a Academia para Contratista.</p>`,
    sections: [
      {
        id: '1',
        title: 'Nombre de la sesión',
        description: 'Introducción a JavaScript.',
        modules: [
          { id: '1', title: 'Módulo 1', content: 'Contenido del Módulo 1', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw'},
          { id: '2', title: 'Módulo 2', content: 'Contenido del Módulo 2', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '3', title: 'Módulo 3', content: 'Contenido del Módulo 3', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '4', title: 'Módulo 4', content: 'Contenido del Módulo 2', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '5', title: 'Módulo 5', content: 'Contenido del Módulo 1', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          
        ],
      },
      {
        id: '2',
        title: 'Nombre de la sesión',
        description: 'Introducción a JavaScript.',
        modules: [
          { id: '1', title: 'Módulo 1', content: 'Contenido del Módulo 1', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw'},
          { id: '2', title: 'Módulo 2', content: 'Contenido del Módulo 2', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '3', title: 'Módulo 3', content: 'Contenido del Módulo 3', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '4', title: 'Módulo 4', content: 'Contenido del Módulo 2', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '5', title: 'Módulo 5', content: 'Contenido del Módulo 1', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
        ],
      },
      {
        id: '3',
        title: 'Nombre de la sesión',
        description: 'Introducción a JavaScript.',
        modules: [
          { id: '1', title: 'Módulo 1', content: 'Contenido del Módulo 1', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw'},
          { id: '2', title: 'Módulo 2', content: 'Contenido del Módulo 2', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '3', title: 'Módulo 3', content: 'Contenido del Módulo 3', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '4', title: 'Módulo 4', content: 'Contenido del Módulo 2', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '5', title: 'Módulo 5', content: 'Contenido del Módulo 1', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
        ],
      },
      {
        id: '4',
        title: 'Nombre de la sesión',
        description: 'Introducción a JavaScript.',
        modules: [
          { id: '1', title: 'Módulo 1', content: 'Contenido del Módulo 1', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw'},
          { id: '2', title: 'Módulo 2', content: 'Contenido del Módulo 2', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '3', title: 'Módulo 3', content: 'Contenido del Módulo 3', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '4', title: 'Módulo 4', content: 'Contenido del Módulo 2', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '5', title: 'Módulo 5', content: 'Contenido del Módulo 1', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
        ],
      },
      {
        id: '5',
        title: 'Nombre de la sesión',
        description: 'Introducción a JavaScript.',
        modules: [
          { id: '1', title: 'Módulo 1', content: 'Contenido del Módulo 1', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw'},
          { id: '2', title: 'Módulo 2', content: 'Contenido del Módulo 2', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '3', title: 'Módulo 3', content: 'Contenido del Módulo 3', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '4', title: 'Módulo 4', content: 'Contenido del Módulo 2', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '5', title: 'Módulo 5', content: 'Contenido del Módulo 1', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'Capacitación Oline Drytec',
    especialista:'Oscar Lopez',
    rubro:'React',
    inicio:'09/09/2024',
    fin:'10/09/2024',
    hora:'19.00',
    image:'/curso1.png',
    description: 'Construye aplicaciones con React.',
    recomendaciones:`<p>Bienvenido/a Academia para Contratista.</p>
    <p>Esta capacitación se imparte de manera presencial en la tienda indicada en el título de esta.</p>
    <p>Para que tenga una mejor experiencia de capacitación le entregamos las siguientes recomendaciones:</p>
    <ul>
    <li>Llegar con al menos 5 minutos de anticipación a la hora pautada de la capacitación.</li>
    <li>Llevar cuaderno y lápiz para anotar lo que necesite.</li>
    <li>Al llegar a tienda consultar hacía donde se debe dirigir para participar en la capacitación con el capitán del Círculo de Especialistas o en el módulo de información.</li>
    <li>Si tiene dudas previas acerca de la temática o la marca puede verlo en la charla en conjunto al relator.</li>
    <li>Recuerde que son cupos limitados por orden de llegada, por lo que si llega tarde a la actividad corre el riesgo de que no pueda ingresar.</li>
    </ul>
    <p>Si tiene más dudas comuníquese con nuestro Call Center al: 225735xxx – 80091xxx7 o por nuestro Whatsapp +505 99129xxx.</p>
    <p>Esperamos que tenga una muy buena experiencia de capacitación junto a Academia para Contratista.</p>`,
    sections: [
      {
        id: '1',
        title: 'Nombre de la sesión',
        description: 'Introducción a React.',
        modules: [
          { id: '1', title: 'Módulo 1', content: 'Contenido del Módulo 1', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw'},
          { id: '2', title: 'Módulo 2', content: 'Contenido del Módulo 2', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '3', title: 'Módulo 3', content: 'Contenido del Módulo 3', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '4', title: 'Módulo 4', content: 'Contenido del Módulo 2', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '5', title: 'Módulo 5', content: 'Contenido del Módulo 1', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
        ],
      },
      {
        id: '2',
        title: 'Nombre de la sesión',
        description: 'Introducción a React.',
        modules: [
          { id: '1', title: 'Módulo 1', content: 'Contenido del Módulo 1', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw'},
          { id: '2', title: 'Módulo 2', content: 'Contenido del Módulo 2', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '3', title: 'Módulo 3', content: 'Contenido del Módulo 3', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '4', title: 'Módulo 4', content: 'Contenido del Módulo 2', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '5', title: 'Módulo 5', content: 'Contenido del Módulo 1', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
        ],
      },
      {
        id: '3',
        title: 'Nombre de la sesión',
        description: 'Introducción a React.',
        modules: [
          { id: '1', title: 'Módulo 1', content: 'Contenido del Módulo 1', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw'},
          { id: '2', title: 'Módulo 2', content: 'Contenido del Módulo 2', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '3', title: 'Módulo 3', content: 'Contenido del Módulo 3', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '4', title: 'Módulo 4', content: 'Contenido del Módulo 2', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '5', title: 'Módulo 5', content: 'Contenido del Módulo 1', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
        ],
      },
      {
        id: '4',
        title: 'Nombre de la sesión',
        description: 'Introducción a React.',
        modules: [
          { id: '1', title: 'Módulo 1', content: 'Contenido del Módulo 1', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw'},
          { id: '2', title: 'Módulo 2', content: 'Contenido del Módulo 2', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '3', title: 'Módulo 3', content: 'Contenido del Módulo 3', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '4', title: 'Módulo 4', content: 'Contenido del Módulo 2', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '5', title: 'Módulo 5', content: 'Contenido del Módulo 1', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
        ],
      },
      {
        id: '5',
        title: 'Nombre de la sesión',
        description: 'Introducción a React.',
        modules: [
          { id: '1', title: 'Módulo 1', content: 'Contenido del Módulo 1', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw'},
          { id: '2', title: 'Módulo 2', content: 'Contenido del Módulo 2', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '3', title: 'Módulo 3', content: 'Contenido del Módulo 3', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '4', title: 'Módulo 4', content: 'Contenido del Módulo 2', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '5', title: 'Módulo 5', content: 'Contenido del Módulo 1', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
        ],
      },
    ],
  },
  {
    id: '3',
    title: 'Lo que debes de saber sobre pintura',
    especialista:'Oscar Lopez',
    rubro:'Pinturas',
    inicio:'09/09/2024',
    fin:'10/09/2024',
    hora:'19:00',
    image:'/curso1.png',
    description: 'Construye aplicaciones con React.',
    recomendaciones: `<p>Bienvenido/a Academia para Contratista.</p>
    <p>Esta capacitación se imparte de manera presencial en la tienda indicada en el título de esta.</p>
    <p>Para que tenga una mejor experiencia de capacitación le entregamos las siguientes recomendaciones:</p>
    <ul>
    <li>Llegar con al menos 5 minutos de anticipación a la hora pautada de la capacitación.</li>
    <li>Llevar cuaderno y lápiz para anotar lo que necesite.</li>
    <li>Al llegar a tienda consultar hacía donde se debe dirigir para participar en la capacitación con el capitán del Círculo de Especialistas o en el módulo de información.</li>
    <li>Si tiene dudas previas acerca de la temática o la marca puede verlo en la charla en conjunto al relator.</li>
    <li>Recuerde que son cupos limitados por orden de llegada, por lo que si llega tarde a la actividad corre el riesgo de que no pueda ingresar.</li>
    </ul>
    <p>Si tiene más dudas comuníquese con nuestro Call Center al: 225735xxx – 80091xxx7 o por nuestro Whatsapp +505 99129xxx.</p>
    <p>Esperamos que tenga una muy buena experiencia de capacitación junto a Academia para Contratista.</p>`,
    sections: [
      {
        id: '1',
        title: 'Nombre de la sesión',
        description: 'Introducción a React.',
        modules: [
          { id: '1', title: 'Módulo 1', content: 'Contenido del Módulo 1', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw'},
          { id: '2', title: 'Módulo 2', content: 'Contenido del Módulo 2', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '3', title: 'Módulo 3', content: 'Contenido del Módulo 3', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '4', title: 'Módulo 4', content: 'Contenido del Módulo 2', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '5', title: 'Módulo 5', content: 'Contenido del Módulo 1', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
        ],
      },
      {
        id: '2',
        title: 'Nombre de la sesión',
        description: 'Introducción a React.',
        modules: [
          { id: '1', title: 'Módulo 1', content: 'Contenido del Módulo 1', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw'},
          { id: '2', title: 'Módulo 2', content: 'Contenido del Módulo 2', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '3', title: 'Módulo 3', content: 'Contenido del Módulo 3', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '4', title: 'Módulo 4', content: 'Contenido del Módulo 2', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '5', title: 'Módulo 5', content: 'Contenido del Módulo 1', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
        ],
      },
      {
        id: '3',
        title: 'Nombre de la sesión',
        description: 'Introducción a React.',
        modules: [
          { id: '1', title: 'Módulo 1', content: 'Contenido del Módulo 1', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw'},
          { id: '2', title: 'Módulo 2', content: 'Contenido del Módulo 2', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '3', title: 'Módulo 3', content: 'Contenido del Módulo 3', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '4', title: 'Módulo 4', content: 'Contenido del Módulo 2', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '5', title: 'Módulo 5', content: 'Contenido del Módulo 1', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
        ],
      },
      {
        id: '4',
        title: 'Nombre de la sesión',
        description: 'Introducción a React.',
        modules: [
          { id: '1', title: 'Módulo 1', content: 'Contenido del Módulo 1', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw'},
          { id: '2', title: 'Módulo 2', content: 'Contenido del Módulo 2', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '3', title: 'Módulo 3', content: 'Contenido del Módulo 3', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '4', title: 'Módulo 4', content: 'Contenido del Módulo 2', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '5', title: 'Módulo 5', content: 'Contenido del Módulo 1', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
        ],
      },
      {
        id: '5',
        title: 'Nombre de la sesión',
        description: 'Introducción a React.',
        modules: [
          { id: '1', title: 'Módulo 1', content: 'Contenido del Módulo 1', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw'},
          { id: '2', title: 'Módulo 2', content: 'Contenido del Módulo 2', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '3', title: 'Módulo 3', content: 'Contenido del Módulo 3', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '4', title: 'Módulo 4', content: 'Contenido del Módulo 2', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '5', title: 'Módulo 5', content: 'Contenido del Módulo 1', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
        ],
      },
    ],
  },
];

// Funciones para obtener los cursos
export const getCourses = async (): Promise<Course[]> => {
  return coursesData;
};

export const getCourseById = async (id: string): Promise<Course | null> => {
  const course = coursesData.find(course => course.id === id);
  return course || null;
};