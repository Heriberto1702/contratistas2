import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get("id");

    if (!courseId) {
      // Obtener todos los cursos ordenados por id_curso de forma ascendente
      const cursos = await prisma.cursos.findMany({
        orderBy: { id_curso: "asc" }, // Siempre ordenado en orden ASCENDENTE
        include: {
          sesiones: {
            include: {
              Modulos: true,
            },
          },
        },
      });
      return NextResponse.json(cursos, { status: 200 });
    }

    // Obtener un curso específico por ID
    const curso = await prisma.cursos.findUnique({
      where: { id_curso: Number(courseId) },
      include: {
        sesiones: {
          include: {
            Modulos: true,
          },
        },
      },
    });

    if (!curso) {
      return NextResponse.json({ error: "Curso no encontrado." }, { status: 404 });
    }

    return NextResponse.json(curso, { status: 200 });
  } catch (error) {
    console.error("Error al obtener los cursos:", error);
    return NextResponse.json({ error: "Error al obtener los cursos." }, { status: 500 });
  }
}
