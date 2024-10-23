// src/types/course.ts

export interface Module {
    id: string;
    title: string;
    content: string;
    url:string;
  }
  
  export interface Section {
    id: string;
    title: string;
    description: string;
    modules: Module[]; // Asegúrate de que esta línea sea así, sin "?".
  }
  
  export interface Course {
    id: string;
    title: string;
    description: string;
    sections: Section[]; // También asegúrate de que sections esté definido.
  }

  export interface PDF {
    id: string;
    title: string;
    description: string;
    url: string;
  }

