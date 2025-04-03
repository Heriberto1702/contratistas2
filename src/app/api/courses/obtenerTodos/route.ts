import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "No autenticado." }, { status: 401 });
  }

  const user = session.user;
  const id_contratista = user.id_contratista;

  if (!id_contratista) {
    return NextResponse.json(
      { error: "Falta el ID del usuario" },
      { status: 400 }
    );
  }

  // Obtener el id_curso de la query (si existe)
  const url = new URL(request.url);
  const id_curso = url.searchParams.get("id_curso");

  try {
    // Si se pasa el parámetro id_curso, traer solo ese curso
    if (id_curso) {
      // Obtener el curso específico junto con las sesiones, módulos y la matrícula del usuario
      const curso = await prisma.cursos.findUnique({
        where: {
          id_curso: parseInt(id_curso),
        },
        select: {
          // Usamos select para escoger solo los campos que necesitamos
          id_curso:true,
          nombre_curso: true,
          imagen_curso:true,
          descripcion: true,
          tipo_curso: true,
          recomendaciones:true,
          especialista: true,
          rubro: true,
          sesiones: {
            orderBy: {
              id_sesion: "asc", // Ordena las sesiones por id_sesion
            },
            select: {
              id_sesion: true,
              nombre_sesion: true,
              descripcion: true,
              Modulos: {
                orderBy: {
                  id_modulo: "asc", // Ordena los módulos por id_modulo
                },
              },
            },
          },
          Cursos_Matriculados: {
            where: { id_contratista },
            select: {
              id_matriculas: true,
              id_contratista: true,
              avance: true,
              estado: true,
            },
          },
        },
      });
      
      if (!curso) {
        return NextResponse.json(
          { error: "Curso no encontrado" },
          { status: 404 }
        );
      }
      return NextResponse.json(curso);
    }

    // Si no se pasa id_curso, traer todos los cursos
    const cursos = await prisma.cursos.findMany({
      orderBy: {
        id_curso: "asc", // Orden ascendente por ID de curso
      },
      select:{
        id_curso:true,
        nombre_curso: true,
        imagen_curso:true,
        recomendaciones:true,
        descripcion: true,
        especialista:true,
        sesiones: {
          orderBy: {
            id_sesion: "asc", // Ordena las sesiones por id_sesion
          },
          select: {
            id_sesion: true,
            nombre_sesion: true,
            descripcion: true,
            Modulos: {
              orderBy: {
                id_modulo: "asc", // Ordena los módulos por id_modulo
              },
            },
          },
        },
        Cursos_Matriculados: {
          where: { id_contratista },
          select: {
            id_matriculas: true,
            avance: true,
            estado: true,
          },
        },
      },
    });

    return NextResponse.json(cursos);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener los cursos" },
      { status: 500 }
    );
  }
}
