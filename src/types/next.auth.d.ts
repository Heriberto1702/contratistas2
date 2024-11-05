// types/next-auth.d.ts

import { DefaultSession } from 'next-auth';

// Extiende los tipos de NextAuth
declare module 'next-auth' {
  interface Session {
    user: {
      id: string; // Añade el id del usuario
    } & DefaultSession['user'];
  }

  interface User {
    id: string; // Asegúrate de que 'id' esté aquí
  }
}