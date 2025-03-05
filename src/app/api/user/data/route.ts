import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Ajusta la ruta según tu estructura
import { getServerSession } from "next-auth/next"; 
import { authOptions } from "../../auth/[...nextauth]/authOptions"; // Asegúrate de que `authOptions` esté correctamente exportado

export async function GET() {
  try {
    console.log("Iniciando el endpoint /api/user/data");

    // Obtener la sesión del usuario autenticado
    const session = await getServerSession(authOptions);

    // Verificar si el usuario está autenticado y tiene email
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ message: "Usuario no autenticado" }, { status: 401 });
    }

    // Buscar en la base de datos usando el email de la sesión
    const user = await prisma.loginPlataforma.findUnique({
      where: { email: session.user.email },
      select: {
        id_contratista: true,
        nombres_contratista: true,
        apellidos_contratista: true,
        celular: true,
        telefono_fijo: true,
        cedula: true,
        ruc: true,
        id_sexo: true,
        id_especialidad: true,
        fecha_nacimiento: true,
        id_departamento: true,
        id_municipio: true,
        id_tipo_contratista: true,
      },
    });

    // Si no se encuentra el usuario, devolver un 404
    if (!user) {
      return NextResponse.json({ message: "Usuario no encontrado" }, { status: 404 });
    }

    console.log("Usuario encontrado:", user);

    // Devolver los datos del usuario
    return NextResponse.json(user, { status: 200 });

  } catch (error: any) {
    console.error("Error en el endpoint /api/user/data:", error instanceof Error ? error.message : error);

    return NextResponse.json(
      { message: "Error al obtener los datos", error: error instanceof Error ? error.message : "Error desconocido" },
      { status: 500 }
    );
  }
}
