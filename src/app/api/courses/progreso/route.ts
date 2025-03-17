import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

// Obtener el progreso del curso
export async function GET(req: { url: string | URL; }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id_curso = parseInt(searchParams.get("id_curso") || "0");
  const id_contratista = session.user.id_contratista;

  const progreso = await prisma.cursos_Matriculados.findFirst({
    where: {
      id_contratista,
      id_curso
    },
    select: { avance: true },
  });

  return NextResponse.json(progreso || { avance: 0 });
}

// Actualizar el progreso del curso
export async function PUT(req: { json: () => PromiseLike<{ id_curso: number; nuevoAvance: number; }> | { id_curso: number; nuevoAvance: number; }; }) {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { id_curso, nuevoAvance } = await req.json();
    const id_contratista = session.user.id_contratista;

    // Obtener el número total de módulos del curso
    const curso = await prisma.cursos.findUnique({
      where: { id_curso },
      include: {
        sesiones: {
          include: {
            Modulos: true,  // Traemos los módulos dentro de cada sesión
          }
        }
      }
    });
    const totalModulos = curso?.sesiones?.reduce((acc, sesion) => acc + sesion.Modulos.length, 0) || 0;

    // Obtener el progreso actual del contratista en el curso
    const progresoActual = await prisma.cursos_Matriculados.findFirst({
      where: {
        id_contratista,
        id_curso,
      },
      select: { avance: true, estado: true },
    });

    // Si el curso ya está finalizado, no se actualiza el progreso
    if (progresoActual?.estado === "Finalizado") {
      return NextResponse.json({ message: "Curso ya completado. No se puede actualizar el progreso." });
    }

    // Verifica si ya hay avance y lo suma correctamente
    const avanceAcumulado = progresoActual ? progresoActual.avance : 0;

    // Calcular el avance por módulo
    const avancePorModulo = 100 / totalModulos;
    const nuevoTotalAvance = avanceAcumulado + avancePorModulo;

    // Definir el estado del curso
    const estado = nuevoTotalAvance >= 100 ? "Finalizado" : "En progreso";

    // Actualizar el progreso en la base de datos
    const matricula = await prisma.cursos_Matriculados.findFirst({
      where: {
        id_contratista,
        id_curso,
      },
    });

    if (matricula) {
      await prisma.cursos_Matriculados.update({
        where: {
          id_matriculas: matricula.id_matriculas,  // Usa el ID único del registro
        },
        data: {
          avance: nuevoTotalAvance,
          estado,
        },
      });
    }

    return NextResponse.json({ message: "Progreso actualizado" });
}
