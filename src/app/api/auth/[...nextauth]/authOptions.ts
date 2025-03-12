import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

declare module "next-auth" {
  interface Session {
    user: {
      image: any;
      id: string;
      email: string;
      name: string;
      id_contratista: number;
      ruc: string | null; // Añadir el campo `ruc`
      cedula: string | null; // Añadir el campo `cedula`
    };
  }
interface User {
  id_contratista: number;
  ruc?: string; // Añadir el campo `ruc`
  cedula?: string; // Añadir el campo `cedula`
}

interface AdapterUser {
  id_contratista: number;
  ruc?: string; // Añadir el campo `ruc`
  cedula?: string; // Añadir el campo `cedula`
}
}


export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        Id_contratista: { label: "Id_contratista", type: "number" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Por favor, proporciona email y contraseña.");
        }

        const user = await prisma.loginPlataforma.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("Usuario no encontrado.");
        }

        const isPasswordValid = bcrypt.compareSync(credentials.password, user.password);

        if (!isPasswordValid) {
          throw new Error("Contraseña incorrecta.");
        }

        return {
          id: user.id_contratista.toString(),
          id_contratista: user.id_contratista,
          email: user.email,
          name: `${user.nombres_contratista} ${user.apellidos_contratista}`,
          ruc: user.ruc ?? null,  // Añadir `ruc`
          cedula: user.cedula ?? null,  // Añadir `cedula`
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      // Solo actualizar los datos de la sesión si es necesario
      if (token && !session.user.id) {
        session.user = {
          image: null, // o proporciona un valor por defecto
          id: token.id as string,
          email: token.email as string,
          name: token.name as string,
          id_contratista: token.id_contratista as number, // Asegúrate de incluir id_contratista
          ruc: token.ruc as string | null, // Asignamos el `ruc` de token a la sesión
          cedula: token.cedula as string | null, // Asignamos el `cedula` de token a la sesión
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      // Solo actualizar el JWT si el usuario está disponible
      if (user) {
        token.id = user.id;
        token.email = user.email!;
        token.name = user.name ?? "";
        token.id_contratista = user.id_contratista;
        token.ruc = user.ruc;  // Añadir `ruc` al token
        token.cedula = user.cedula;  // Añadir `cedula` al token
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
};
