// src/service/coursesServices.ts

import { Course, PDF } from '../types/course';


// Simulación de datos para cursos, secciones y módulos
const coursesData: Course[] = [
  {
    id: '1',
    title: 'Instalaciones Eléctricas Básicas Domiciliarias',
    especialista: 'Oscar López',
    rubro: 'Electricidad',
    inicio: '09/09/2024',
    fin: '10/09/2024',
    hora: '19:00',
    image: '/curso1.png',
    isEnrolled: true,
    hasResults: false,
    description: 'Este curso te enseñará los conceptos básicos y las habilidades esenciales para realizar instalaciones eléctricas en viviendas de manera profesional y segura.',
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
        title: 'Instalaciones Básicas',
        description: 'Introducción a las instalaciones eléctricas en viviendas.',
        modules: [
          { id: '1', title: 'Seguridad Eléctrica', content: 'Aprende a realizar instalaciones seguras siguiendo normas de seguridad.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '2', title: 'Herramientas Básicas', content: 'Conoce las herramientas esenciales para cualquier instalación eléctrica.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '3', title: 'Instalación de Circuitos', content: 'Cómo instalar circuitos eléctricos de manera eficiente.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '4', title: 'Resolución de Problemas Comunes', content: 'Técnicas para solucionar problemas comunes en instalaciones eléctricas.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '5', title: 'Revisión Final', content: 'Cómo realizar una revisión y prueba de tus instalaciones para asegurarte de que todo funcione correctamente.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
        ]
      },
      {
        id: '2',
        title: 'Cableado y Conexiones',
        description: 'Aprende sobre los diferentes tipos de cableado y conexiones utilizadas en el hogar.',
        modules: [
          { id: '1', title: 'Tipos de Cables', content: 'Comprende los distintos tipos de cables y sus usos.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '2', title: 'Conectores y Tuberías', content: 'Cómo elegir y usar conectores y tuberías en las instalaciones.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
        ]
      }
    ]
  },
  {
    id: '2',
  title: 'Capacitación Online Drytec',
  especialista: 'Oscar Lopez',
  rubro: 'React',
  inicio: '09/09/2024',
  fin: '10/09/2024',
  hora: '19:00',
  image: '/curso2.png',
  isEnrolled: true,
  hasResults: false,
  description: 'Construye aplicaciones con React.',
  recomendaciones: `<p>Bienvenido/a a la Capacitación Online Drytec.</p>
    <p>Esta capacitación se impartirá de manera presencial en la tienda indicada en el título de esta.</p>
    <p>Para que tengas una mejor experiencia de capacitación, te entregamos las siguientes recomendaciones:</p>
    <ul>
    <li>Llega con al menos 5 minutos de anticipación a la hora pautada de la capacitación.</li>
    <li>Lleva cuaderno y lápiz para anotar lo que necesites.</li>
    <li>Al llegar a la tienda, consulta hacia dónde debes dirigirte para participar en la capacitación con el capitán del Círculo de Especialistas o en el módulo de información.</li>
    <li>Si tienes dudas previas sobre la temática o la marca, puedes resolverlas durante la charla con el relator.</li>
    <li>Recuerda que hay cupos limitados por orden de llegada, así que si llegas tarde, corres el riesgo de no poder ingresar.</li>
    </ul>
    <p>Si tienes más dudas, comunícate con nuestro Call Center al: 225735xxx – 80091xxx7 o por nuestro Whatsapp +505 99129xxx.</p>
    <p>Esperamos que tengas una excelente experiencia de capacitación junto a Academia para Contratista.</p>`,
  sections: [
    {
      id: '1',
      title: 'Introducción a React',
      description: 'Aprende los fundamentos de React, su importancia y cómo iniciar un proyecto.',
      modules: [
        { id: '1', title: 'Qué es React', content: 'Introducción a la biblioteca y sus características.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
        { id: '2', title: 'Creando tu primer componente', content: 'Cómo crear y renderizar un componente básico en React.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
        { id: '3', title: 'JSX y Renderizado', content: 'Entender JSX y cómo se renderizan los componentes.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
        { id: '4', title: 'Props y State', content: 'Aprende sobre el uso de props y state para gestionar datos.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
        { id: '5', title: 'Manejo de Eventos', content: 'Cómo manejar eventos en React para hacer aplicaciones interactivas.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
      ],
    },
    {
      id: '2',
      title: 'Componentes y Ciclo de Vida',
      description: 'Profundiza en los componentes y su ciclo de vida en React.',
      modules: [
        { id: '1', title: 'Componentes de Clase vs Funcionales', content: 'Diferencias y cuándo usar cada tipo.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
        { id: '2', title: 'El Ciclo de Vida de un Componente', content: 'Entiende las fases del ciclo de vida de un componente React.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
        { id: '3', title: 'Hooks de React', content: 'Introducción a los hooks y cómo usarlos en tus componentes.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
        { id: '4', title: 'Context API', content: 'Gestión de estado global usando Context API.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
        { id: '5', title: 'Renderizado Condicional', content: 'Aprende a renderizar componentes de manera condicional.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
      ],
    },
    {
      id: '3',
      title: 'Rutas y Navegación',
      description: 'Implementa rutas y navegación en tus aplicaciones React.',
      modules: [
        { id: '1', title: 'React Router', content: 'Introducción a React Router y cómo configurarlo.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
        { id: '2', title: 'Navegación entre Páginas', content: 'Cómo navegar entre diferentes páginas de tu aplicación.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
        { id: '3', title: 'Rutas Anidadas', content: 'Manejo de rutas anidadas en React Router.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
        { id: '4', title: 'Enrutamiento Dinámico', content: 'Aprende a crear rutas dinámicas basadas en parámetros.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
        { id: '5', title: 'Protección de Rutas', content: 'Cómo proteger rutas privadas en tu aplicación.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
      ],
    },
    {
      id: '4',
      title: 'Gestión del Estado',
      description: 'Manejo del estado en aplicaciones React.',
      modules: [
        { id: '1', title: 'Redux', content: 'Introducción a Redux y cómo integrarlo en tu aplicación.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
        { id: '2', title: 'Manejo del Estado Local', content: 'Cómo gestionar el estado local usando hooks.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
        { id: '3', title: 'Uso de Middleware', content: 'Implementación de middleware en Redux.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
        { id: '4', title: 'Persistencia del Estado', content: 'Cómo mantener el estado de tu aplicación entre sesiones.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
        { id: '5', title: 'Testing de Estado', content: 'Pruebas de tus acciones y reducers en Redux.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
      ],
    },
    {
      id: '5',
      title: 'Despliegue y Optimización',
      description: 'Aprende a desplegar y optimizar tu aplicación React.',
      modules: [
        { id: '1', title: 'Despliegue en Producción', content: 'Cómo preparar tu aplicación para el despliegue.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
        { id: '2', title: 'Optimización de Rendimiento', content: 'Técnicas para optimizar el rendimiento de tu aplicación.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
        { id: '3', title: 'Pruebas de Aplicación', content: 'Cómo realizar pruebas efectivas en tu aplicación React.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
        { id: '4', title: 'Accesibilidad en React', content: 'Mejores prácticas para asegurar la accesibilidad de tu aplicación.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
        { id: '5', title: 'Mantenimiento y Actualizaciones', content: 'Cómo mantener y actualizar tu aplicación después del lanzamiento.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
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
    image:'/curso3.png',
    isEnrolled: false,
    hasResults: false,
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
          { id: '1', title: 'Módulo 1', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw'},
          { id: '2', title: 'Módulo 2', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '3', title: 'Módulo 3', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '4', title: 'Módulo 4', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '5', title: 'Módulo 5', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
        ],
      },
      {
        id: '2',
        title: 'Nombre de la sesión',
        description: 'Introducción a React.',
        modules: [
          { id: '1', title: 'Módulo 1', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw'},
          { id: '2', title: 'Módulo 2', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '3', title: 'Módulo 3', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '4', title: 'Módulo 4', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '5', title: 'Módulo 5', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
        ],
      },
      {
        id: '3',
        title: 'Nombre de la sesión',
        description: 'Introducción a React.',
        modules: [
          { id: '1', title: 'Módulo 1', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw'},
          { id: '2', title: 'Módulo 2', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '3', title: 'Módulo 3', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '4', title: 'Módulo 4', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '5', title: 'Módulo 5', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
        ],
      },
      {
        id: '4',
        title: 'Nombre de la sesión',
        description: 'Introducción a React.',
        modules: [
          { id: '1', title: 'Módulo 1', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw'},
          { id: '2', title: 'Módulo 2', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '3', title: 'Módulo 3', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '4', title: 'Módulo 4', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '5', title: 'Módulo 5', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
        ],
      },
      {
        id: '5',
        title: 'Nombre de la sesión',
        description: 'Introducción a React.',
        modules: [
          { id: '1', title: 'Módulo 1', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw'},
          { id: '2', title: 'Módulo 2', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '3', title: 'Módulo 3', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '4', title: 'Módulo 4', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '5', title: 'Módulo 5', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
        ],
      },
    ],
  },
  {
    id: '4',
    title: 'Lo que debes de saber sobre pintura',
    especialista:'Oscar Lopez',
    rubro:'Pinturas',
    inicio:'09/09/2024',
    fin:'10/09/2024',
    hora:'19:00',
    image:'/curso1.png',
    isEnrolled: false,
    hasResults: false,
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
          { id: '1', title: 'Módulo 1', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw'},
          { id: '2', title: 'Módulo 2', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '3', title: 'Módulo 3', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '4', title: 'Módulo 4', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '5', title: 'Módulo 5', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
        ],
      },
      {
        id: '2',
        title: 'Nombre de la sesión',
        description: 'Introducción a React.',
        modules: [
          { id: '1', title: 'Módulo 1', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw'},
          { id: '2', title: 'Módulo 2', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '3', title: 'Módulo 3', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '4', title: 'Módulo 4', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '5', title: 'Módulo 5', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
        ],
      },
      {
        id: '3',
        title: 'Nombre de la sesión',
        description: 'Introducción a React.',
        modules: [
          { id: '1', title: 'Módulo 1', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw'},
          { id: '2', title: 'Módulo 2', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '3', title: 'Módulo 3', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '4', title: 'Módulo 4', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '5', title: 'Módulo 5', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
        ],
      },
      {
        id: '4',
        title: 'Nombre de la sesión',
        description: 'Introducción a React.',
        modules: [
          { id: '1', title: 'Módulo 1', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw'},
          { id: '2', title: 'Módulo 2', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '3', title: 'Módulo 3', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '4', title: 'Módulo 4', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '5', title: 'Módulo 5', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
        ],
      },
      {
        id: '5',
        title: 'Nombre de la sesión',
        description: 'Introducción a React.',
        modules: [
          { id: '1', title: 'Módulo 1', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw'},
          { id: '2', title: 'Módulo 2', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '3', title: 'Módulo 3', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '4', title: 'Módulo 4', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '5', title: 'Módulo 5', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
        ],
      },
    ],
  },
  {
    id: '5',
    title: 'Lo que debes de saber sobre pintura',
    especialista:'Oscar Lopez',
    rubro:'Pinturas',
    inicio:'09/09/2024',
    fin:'10/09/2024',
    hora:'19:00',
    image:'/curso2.png',
    isEnrolled: false,
    hasResults: false,
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
          { id: '1', title: 'Módulo 1', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw'},
          { id: '2', title: 'Módulo 2', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '3', title: 'Módulo 3', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '4', title: 'Módulo 4', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '5', title: 'Módulo 5', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
        ],
      },
      {
        id: '2',
        title: 'Nombre de la sesión',
        description: 'Introducción a React.',
        modules: [
          { id: '1', title: 'Módulo 1', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw'},
          { id: '2', title: 'Módulo 2', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '3', title: 'Módulo 3', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '4', title: 'Módulo 4', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '5', title: 'Módulo 5', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
        ],
      },
      {
        id: '3',
        title: 'Nombre de la sesión',
        description: 'Introducción a React.',
        modules: [
          { id: '1', title: 'Módulo 1', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw'},
          { id: '2', title: 'Módulo 2', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '3', title: 'Módulo 3', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '4', title: 'Módulo 4', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '5', title: 'Módulo 5', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
        ],
      },
      {
        id: '4',
        title: 'Nombre de la sesión',
        description: 'Introducción a React.',
        modules: [
          { id: '1', title: 'Módulo 1', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw'},
          { id: '2', title: 'Módulo 2', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '3', title: 'Módulo 3', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '4', title: 'Módulo 4', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '5', title: 'Módulo 5', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
        ],
      },
      {
        id: '5',
        title: 'Nombre de la sesión',
        description: 'Introducción a React.',
        modules: [
          { id: '1', title: 'Módulo 1', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw'},
          { id: '2', title: 'Módulo 2', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '3', title: 'Módulo 3', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '4', title: 'Módulo 4', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '5', title: 'Módulo 5', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
        ],
      },
    ],
  },
  {
    id: '6',
    title: 'Lo que debes de saber sobre pintura',
    especialista:'Oscar Lopez',
    rubro:'Pinturas',
    inicio:'09/09/2024',
    fin:'10/09/2024',
    hora:'19:00',
    image:'/curso3.png',
    isEnrolled: false,
    hasResults: false,
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
          { id: '1', title: 'Módulo 1', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw'},
          { id: '2', title: 'Módulo 2', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '3', title: 'Módulo 3', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '4', title: 'Módulo 4', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '5', title: 'Módulo 5', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
        ],
      },
      {
        id: '2',
        title: 'Nombre de la sesión',
        description: 'Introducción a React.',
        modules: [
          { id: '1', title: 'Módulo 1', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw'},
          { id: '2', title: 'Módulo 2', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '3', title: 'Módulo 3', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '4', title: 'Módulo 4', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '5', title: 'Módulo 5', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
        ],
      },
      {
        id: '3',
        title: 'Nombre de la sesión',
        description: 'Introducción a React.',
        modules: [
          { id: '1', title: 'Módulo 1', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw'},
          { id: '2', title: 'Módulo 2', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '3', title: 'Módulo 3', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '4', title: 'Módulo 4', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '5', title: 'Módulo 5', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
        ],
      },
      {
        id: '4',
        title: 'Nombre de la sesión',
        description: 'Introducción a React.',
        modules: [
          { id: '1', title: 'Módulo 1', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw'},
          { id: '2', title: 'Módulo 2', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '3', title: 'Módulo 3', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '4', title: 'Módulo 4', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '5', title: 'Módulo 5', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
        ],
      },
      {
        id: '5',
        title: 'Nombre de la sesión',
        description: 'Introducción a React.',
        modules: [
          { id: '1', title: 'Módulo 1', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw'},
          { id: '2', title: 'Módulo 2', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '3', title: 'Módulo 3', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '4', title: 'Módulo 4', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
          { id: '5', title: 'Módulo 5', content: 'Para llevar a cabo su proyecto de construcción de manera profesional. Apoyamos indicando las cantidades de material necesario.', url: 'https://www.youtube.com/watch?v=OM7FKgVBWRw' },
        ],
      },
    ],
  },
];

// Simulación de datos para documentos pdf
export const pdfData: PDF[] = [
  {
    id: '1',
    title: 'Maestros y Maestras de la construcción, mantengan a sus clientes satisfechos con esta serie de consejos que le presentamos.',
    description: 'Mantenerlos fidelizados es de suma importancia y utilidad ya que con esto aumenta las probabilidades de que le vuelvan a contratar y recomienden sus servicios a otras personas, ampliando así su cartera de clientes.',
    url: '/fidelizar.png'
  },
  {
    id: '2',
    title: `Sabemos la importancia de formalizar su empresa y los múltiples beneficios 
de que esta puede llevar al hacerlo de la manera adecuada.`,
    description: `Por eso le proporcionamos una guía sobre los diferentes tipos de empresas, las ventajas de cada una 
y ¡cómo crear la suya paso a paso en 1 día!`,
    url: '/presupuesto.png'
  },
  {
    id: '3',
    title: `Sabemos la importancia de formalizar su empresa 
y los múltiples beneficios de hacerlo.`,
    description: `Por eso le proporcionamos una guía sobre los diferentes tipos de empresas, las ventajas de cada una 
y ¡cómo crear la suya paso a paso en 1 día!`,
    url: '/formaliza.png'
  }
]

// Funciones para obtener los cursos
export const getCourses = async (): Promise<Course[]> => {
  return coursesData;
};

export const getCourseById = async (id: string): Promise<Course | null> => {
  const course = coursesData.find(course => course.id === id);
  return course || null;
};

export const getPdfById = async (id: string): Promise<PDF | null> => {
  const pdf = pdfData.find(pdf => pdf.id === id);
  return pdf || null;
};

