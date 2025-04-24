import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"; // Asegúrate de importar las opciones correctas
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Obtén la sesión del usuario autenticado
    const session = await getServerSession(authOptions);

    if (!session) {
      // Si no está autenticado, retorna un error 401
      return NextResponse.json(
        { message: "No autenticado." },
        { status: 401 }
      );
    }

    const user = session.user;
    const email = user.email;

    // Validar si el correo existe en la tabla UserRoles
    const userRole = await prisma.userRoles.findUnique({
      where: { email },
    });

    if (userRole) {
      // Si el correo existe, retorna los datos
      return NextResponse.json(
        { message: "Usuario encontrado", role: userRole.role, email }
      );
    } else {
      // Si no existe, retorna un mensaje de no autorizado
      return NextResponse.json(
        { message: "Usuario no encontrado", email },
        { status: 403 }
      );
    }
  } catch (error: any) {
    // Capturar y retornar errores
    return NextResponse.json(
      { message: "Error al validar el correo.", error: error.message || "Error desconocido." },
      { status: 500 }
    );
  }
}