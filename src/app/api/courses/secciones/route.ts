import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"; // Asegúrate de importar las opciones de autenticación correctas

export async function GET(req: Request) {
  try {
    // Obtener la sesión del usuario logueado
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id_contratista) {
      return NextResponse.json(
        { error: "No estás autenticado o no tienes el id_contratista en tu sesión." },
        { status: 401 }
      );
    }

    // Obtener el id_contratista desde la sesión
    const id_contratista = Number(session.user.id_contratista);

    // Obtener los parámetros de la URL (id_contratista y id_curso)
    const searchParams = new URL(req.url).searchParams;
    const id_curso = Number(searchParams.get("id_curso"));

    // Verificar si el contratista está matriculado en el curso específico
    const matricula = await prisma.cursos_Matriculados.findFirst({
      where: {
        id_contratista,
        id_curso,
      },
    });

    if (!matricula) {
      return NextResponse.json({ error: "No estás matriculado en este curso." }, { status: 403 });
    }

    return NextResponse.json({ matriculado: true });

  } catch (error) {
    console.error("Error al verificar la matrícula:", error);
    return NextResponse.json(
      { error: "Ocurrió un error al verificar la matrícula." },
      { status: 500 }
    );
  }
}
