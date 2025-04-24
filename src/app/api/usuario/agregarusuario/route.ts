import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Asegúrate de que esta ruta esté correcta

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Parsea el cuerpo de la solicitud
    const { email, role } = body;

    if (!email || !role) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    const newUserRole = await prisma.userRoles.create({
      data: {
        email,
        role,
      },
    });

    return NextResponse.json(newUserRole, { status: 200 });
  } catch (error) {
    console.error('Error al agregar rol de usuario:', error);
    return NextResponse.json(
      { error: 'Error al agregar rol de usuario' },
      { status: 500 }
    );
  }
}