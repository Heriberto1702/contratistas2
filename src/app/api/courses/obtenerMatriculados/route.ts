import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"; // Asegúrate de importar las opciones de autenticación correctas
 // Asegúrate de que la ruta de authOptions sea la correcta

export async function GET() {
  try {
    // Obtener la sesión del usuario logueado
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "No autenticado." }, { status: 401 });
    }
    const user = session.user;
    // Obtener el id_contratista desde la sesión
    const id_contratista = user.id_contratista;

    // Obtener todos los cursos matriculados del contratista
    const cursosMatriculados = await prisma.cursos_Matriculados.findMany({
      where: { id_contratista },
      include: {
        Cursos: true, // Incluir detalles del curso
      },
    });

    // Retornar la respuesta en formato JSON
    return NextResponse.json(cursosMatriculados, { status: 200 });
  } catch (error) {
    console.error("Error al obtener los cursos matriculados:", error);
    return NextResponse.json(
      { error: "Ocurrió un error al obtener los cursos matriculados." },
      { status: 500 }
    );
  }
}
