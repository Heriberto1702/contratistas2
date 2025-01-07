// src/middleware.ts
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  // Define la baseURL según el entorno
  const baseURL =
    process.env.NODE_ENV === "production"
      ? "https://contratistas2.vercel.app"
      : "http://localhost:3000";

  // Si no hay token, redirige a la página de login
  if (!token) {
    return NextResponse.redirect(new URL("/login", baseURL));
  }

  // Permitir el acceso a la página
  return NextResponse.next();
}

// Define qué rutas deben ser protegidas
export const config = {
  matcher: ["/academia/:path*", "/datos/:path*", "/compras/:path*", "/"], // Protege estas rutas
};