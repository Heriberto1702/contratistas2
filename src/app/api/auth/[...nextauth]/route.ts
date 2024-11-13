// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const user = await prisma.loginPlataforma.findUnique({  //aqui se aplico el cambio de nombre de la BD
          where: { email: credentials?.email },
        });

        if (user && bcrypt.compareSync(credentials?.password || "", user.password)) {
          return {
            id: user.id.toString(), // Convertimos a string para asegurar compatibilidad
            email: user.email,
            name: user.name ?? "", // Proporcionamos un valor predeterminado para name
          };
        }
        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.sub ?? "", // Usamos un valor predeterminado para id si es undefined
          email: token.email ?? "", // Usamos un valor predeterminado para email si es undefined
          name: token.name ?? "", // Usamos un valor predeterminado para name si es undefined
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email ?? "";
        token.name = user.name ?? "";
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };