import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Ajusta la ruta según tu estructura de proyecto
import { getServerSession } from "next-auth/next"; // Utiliza getServerSession para las rutas en `app`
import { authOptions } from "@/lib/auth"; // Asegúrate de exportar tus opciones de next-auth correctamente

export async function GET(request: Request) {
  try {
    // Obtén la sesión utilizando getServerSession
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Usuario no autenticado" }, { status: 401 });
    }

    // Obtener los datos del usuario con Prisma
    const user = await prisma.loginPlataforma.findUnique({
      where: {
        email: session.user.email, // Usamos el email de la sesión
      },
    });

    if (!user) {
      return NextResponse.json({ message: "Usuario no encontrado" }, { status: 404 });
    }

    // Responde con los datos del usuario
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error obteniendo datos del usuario", error);
    return NextResponse.json({ message: "Error al obtener los datos" }, { status: 500 });
  }
}