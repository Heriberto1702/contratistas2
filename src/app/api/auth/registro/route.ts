// src/app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs"; // Cambiado de 'bcrypt' a 'bcryptjs'

export async function POST(req: Request) {
  const { email, password, name } = await req.json();

  // Hashear la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  // Crear el nuevo usuario
  const user = await prisma.loginPlataforma.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  // Retornar una respuesta
  return NextResponse.json(user);
}