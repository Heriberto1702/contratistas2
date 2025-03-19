import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    // Obtener el parámetro id_curso desde la query
    const url = new URL(request.url);
    const id_curso = url.searchParams.get('id_curso'); // Obtener el id_curso de la query string

    // Si se proporciona el id_curso, buscar un solo curso
   if (id_curso) {
  const curso = await prisma.cursos.findUnique({
    where: {
      id_curso: parseInt(id_curso, 10), // Convertir el id_curso a número
    },
    include: {
      sesiones: {
        orderBy: {
          // Ordenar las sesiones, puedes usar cualquier campo como 'id_sesion' o 'nombre_sesion'
          id_sesion: 'asc', // Orden alfabético ascendente por nombre de sesión
        },
        include: {
          Modulos: {
            orderBy: {
              // Ordenar los módulos dentro de cada sesión, por ejemplo, por 'titulo_modulo'
             id_modulo: 'asc', // Orden alfabético ascendente por el título del módulo
            },
          },
        },
      },
    },
      });

      if (!curso) {
        return NextResponse.json({ error: "Curso no encontrado" }, { status: 404 });
      }

      return NextResponse.json(curso, { status: 200 });
    }

    // Si no se proporciona id_curso, obtener todos los cursos
    const cursos = await prisma.cursos.findMany({
      orderBy: { id_curso: "asc" },
      select: {
        id_curso: true,
        nombre_curso: true,
        imagen_curso: true,
        fecha_hora_Inicio: true,
        fecha_hora_Fin: true,
        hora: true,
        recomendaciones: true,
        especialista:true,
      },
    });

    return NextResponse.json(cursos, { status: 200 });

  } catch (error) {
    console.error("Error al obtener los cursos:", error);
    return NextResponse.json({ error: "Error al obtener los cursos." }, { status: 500 });
  }
}
