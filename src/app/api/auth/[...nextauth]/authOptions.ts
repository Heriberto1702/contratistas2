import { NextAuthOptions, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
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
      id_contratista: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    name: string;
    id_contratista: string;
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
          id_contratista: user.id_contratista.toString(),
          email: user.email,
          name: `${user.nombres_contratista} ${user.apellidos_contratista}`,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user = {
          image: null, // or provide a default value
          id: token.id as string,
          email: token.email as string,
          name: token.name as string,
          id_contratista: token.id_contratista as string, // Asegúrate de incluir id_contratista
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email!;
        token.name = user.name ?? '';
        token.id_contratista = (user as any).id_contratista; // Asegúrate de incluir id_contratista
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
};