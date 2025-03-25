import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma"; // Ajusta la ruta a tu archivo de Prisma

// Esta API recibe el ID del curso y el ID del contratista (usuario)
export async function PUT(request: Request) {
  try {
    const { id_curso, id_contratista } = await request.json();

    if (!id_curso || !id_contratista) {
      return NextResponse.json(
        { message: "Faltan parámetros necesarios" },
        { status: 400 }
      );
    }

    // Paso 1: Obtener todos los módulos completados del usuario
    const completedModules = await prisma.modulosCompletados.findMany({
      where: {
        id_contratista, id_curso,
        },
      },
    );

// Paso 2: Obtener el número total de módulos del curso
const numeromodulos = await prisma.cursos.findUnique({
  where: { id_curso }, // Obtener el curso con el id proporcionado
  select: {
    sesiones: {
      select: {
        Modulos: { // Relación con los módulos
          select: {
            id_modulo: true, // Solo traemos el id del módulo
          },
        },
      },
    },
  },
});
if (!numeromodulos || !numeromodulos.sesiones) {
  return NextResponse.json(
    { message: "No se encontraron módulos para el curso proporcionado" },
    { status: 404 }
  );
}

const totalModules = numeromodulos.sesiones.reduce((acc, session) => {
  return acc + session.Modulos.length;
}, 0);
    const completedModulesCount = completedModules.length;
    // Paso 3: Calcular el avance en porcentaje
    const progress = Math.ceil((completedModulesCount / totalModules) * 100);

    // Paso 4: Actualizar el progreso en la tabla Cursos_matriculados
    // Fetch the unique identifier (id_matriculas) for the record
    const matricula = await prisma.cursos_Matriculados.findFirst({
      where: {
        id_contratista,
        id_curso,
      },
      select: {
        id_matriculas: true,
      },
    });

    if (!matricula || !matricula.id_matriculas) {
      return NextResponse.json(
        { message: "No se encontró la matrícula para actualizar el avance" },
        { status: 404 }
      );
    }

    // Update the progress using the unique identifier
    await prisma.cursos_Matriculados.update({
      where: {
        id_matriculas: matricula.id_matriculas,
      },
      data: {
        avance: progress,
      },
    });

    // Paso 5: Retornar la respuesta exitosa
    return NextResponse.json(
      { message: "Avance actualizado correctamente", progress },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al actualizar avance:", error);
    return NextResponse.json(
      { message: "Hubo un error al actualizar el avance" },
      { status: 500 }
    );
  }
}
