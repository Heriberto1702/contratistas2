import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Ajusta la ruta según tu estructura
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/authOptions"; // Asegúrate de que `authOptions` esté correctamente exportado

export async function GET() {
  try {
    // Obtener la sesión del usuario logueado
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Usuario no autenticado" }, { status: 401 });
    }

    const email = session.user.email;

    // Obtener datos del usuario logueado
    const user = await prisma.loginPlataforma.findUnique({
      where: { email },
      select: {
        ruc: true,
        cedula: true,
        nombres_contratista: true,
        id_tipo_contratista: true,
        id_departamento: true,
        id_municipio: true,
        id_especialidad: true,
        id_sexo: true,
      },
    });

    // Validar si el usuario existe en la base de datos
    if (!user) {
      return NextResponse.json({ message: "Usuario no encontrado" }, { status: 404 });
    }

    // Obtener información del contratista
    const contratista = await prisma.contratistas.findFirst({
      where: {
        OR: [
          { RUC: user.ruc },
          { cedula: user.cedula }
        ]
      },
      select: {
        nombre_registrado: true,
        id_tipo_club: true,
      },
    });

    // Obtener el nombre del club
    const club = contratista ? await prisma.club.findUnique({
      where: { id_tipo_club: contratista.id_tipo_club },
      select: { tipo_club: true },
    }) : null;

    // Obtener catálogos en paralelo
    const [departamentos, municipios, especialidades, sexos] = await Promise.all([
      prisma.departamentos.findMany(),
      prisma.municipios.findMany(),
      prisma.especialidad.findMany(),
      prisma.sexo.findMany(),
    ]);

    // Construir la respuesta
    const response = {
      nombres_contratista: user.nombres_contratista,
      ruc: user.ruc,
      cedula: user.cedula,
      nivel_contratista: user.id_tipo_contratista,
      nombre_club: club ? club.tipo_club : null,
      catalogos: { departamentos, municipios, especialidades, sexos },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json({ message: "Error fetching data" }, { status: 500 });
  }
}
