import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Ajusta la ruta según tu estructura
import { getServerSession } from "next-auth/next"; 
import { authOptions } from "../../auth/[...nextauth]/route"; // Asegúrate de que `authOptions` esté correctamente exportado

export async function GET() {
  try {
    // Obtener la sesión del usuario autenticado
    const session = await getServerSession(authOptions);

    // Verificar si el usuario está autenticado
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Usuario no autenticado" }, { status: 401 });
    }

    // Consultar los datos del usuario en la tabla `loginPlataforma` usando el email de la sesión
    const user = await prisma.loginPlataforma.findUnique({
      where: { email: session.user.email }, // Usa el email para identificar al usuario
      select: {
        id_contratista: true,
        nombres_contratista: true,
        apellidos_contratista: true,
        celular: true,
        telefono_fijo: true,
        cedula: true,
        RUC: true,
        id_sexo: true,
        id_especialidad: true,
        fecha_nacimiento: true,
        id_departamento: true,
        id_municipio: true,
        id_tipo_contratista: true,
      }, // Solo seleccionamos los campos necesarios
    });

    // Validar si el usuario existe en la base de datos
    if (!user) {
      return NextResponse.json({ message: "Usuario no encontrado" }, { status: 404 });
    }

    // Devolver los datos del usuario
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error obteniendo datos del usuario:", error);
    return NextResponse.json({ message: "Error al obtener los datos" }, { status: 500 });
  }
}