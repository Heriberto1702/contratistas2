// src/middleware.ts
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  // Si no hay token, redirige a la página de login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Permitir el acceso a la página
  return NextResponse.next();
}

// Define qué rutas deben ser protegidas
export const config = {
  matcher: ["/academia/:path*" , "/datos/:path*" , "/compras/:path*" , "/" ], // Protege estas rutas
};