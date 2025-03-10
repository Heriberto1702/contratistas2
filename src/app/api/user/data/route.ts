import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Ajusta la ruta según tu estructura
import { getServerSession } from "next-auth/next"; 
import { authOptions } from "../../auth/[...nextauth]/authOptions"; // Asegúrate de que `authOptions` esté correctamente exportado

export async function GET() {
  try {
    console.log("Iniciando el endpoint /api/user/data");

  // Intentar obtener la sesión hasta que esté lista
  let session = await getServerSession(authOptions);
  if (!session) {
    console.warn("Sesión aún no disponible, reintentando...");
    return NextResponse.json({ message: "Esperando sesión..." }, { status: 503 });
  }

  console.log("Session:", session);
  if (!session.user?.email) {
    return NextResponse.json({ message: "Usuario no autenticado" }, { status: 401 });
  }

    // Consultar los datos del usuario en la tabla `loginPlataforma` usando el email de la sesión
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
    console.log("User from DB:", user);

    // Validar si el usuario existe en la base de datos
    
    if (!user) {
      return NextResponse.json({ message: "Usuario no encontrado" }, { status: 404 });
    }

    // Obtener los catálogos en una sola transacción
    const [departamentos, municipios, especialidades, sexos] = await prisma.$transaction([
      prisma.departamentos.findMany(),
      prisma.municipios.findMany(),
      prisma.especialidad.findMany(),
      prisma.sexo.findMany(),
    ]);

    return NextResponse.json(
      {
        user,
        catalogos: { departamentos, municipios, especialidades, sexos },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en el endpoint /api/user/data:", error);
    return NextResponse.json({ message: "Error al obtener los datos" }, { status: 500 });
  }
}
