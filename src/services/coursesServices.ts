// src/service/coursesServices.ts

import { Course } from '../types/course';

// Simulación de datos para cursos, secciones y módulos
const coursesData: Course[] = [
  {
    id: '1',
    title: 'Curso de JavaScript',
    description: 'Aprende JavaScript desde cero.',
    sections: [
      {
        id: '1',
        title: 'Sección 1',
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
        title: 'Sección 2',
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
        title: 'Sección 3',
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
    title: 'Curso de React',
    description: 'Construye aplicaciones con React.',
    sections: [
      {
        id: '1',
        title: 'Sección 1',
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