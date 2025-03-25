import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { id_contratista, id_curso, id_modulo } = await req.json();

    if (!id_contratista || !id_curso || !id_modulo) {
      return NextResponse.json(
        { error: "Todos los campos son requeridos." },
        { status: 400 }
      );
    }

    // Verificar si el módulo ya fue completado
    const moduloExistente = await prisma.modulosCompletados.findUnique({
      where: {
        id_contratista_id_modulo: { id_contratista, id_modulo },
      },
    });

    if (moduloExistente) {
      return NextResponse.json(
        { message: "El módulo ya fue completado." },
        { status: 200 }
      );
    }

    // Registrar el módulo como completado
    await prisma.modulosCompletados.create({
      data: {
        id_contratista,
        id_curso,
        id_modulo,
      },
    });

    // Obtener el número total de módulos del curso
    const numeromodulos = await prisma.cursos.findUnique({
      where: { id_curso },
      select: {
        sesiones: {
          select: {
            Modulos: {
              select: {
                id_modulo: true,
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

    // Contar cuántos módulos ha completado el usuario
    const modulosCompletados = await prisma.modulosCompletados.count({
      where: { id_contratista, id_curso },
    });

    // Calcular avance (redondeado hacia arriba)
    const nuevoAvance = Math.ceil((modulosCompletados / totalModules) * 100);

    // Determinar el estado según el avance
    let nuevoEstado = "Inscrito";
    if (nuevoAvance > 0 && nuevoAvance < 100) {
      nuevoEstado = "En progreso";
    } else if (nuevoAvance === 100) {
      nuevoEstado = "Finalizado";
    }

    // Actualizar el avance y el estado en Cursos_matriculados
    await prisma.cursos_Matriculados.updateMany({
      where: { id_contratista, id_curso },
      data: { avance: nuevoAvance, estado: nuevoEstado },
    });

    return NextResponse.json(
      { message: "Módulo completado y avance actualizado.", avance: nuevoAvance, estado: nuevoEstado },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error al registrar módulo y actualizar avance:", error);
    return NextResponse.json(
      { error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}


export async function PUT(req: NextRequest) {
  const { id_contratista, id_curso} = await req.json();

    if (!id_contratista || !id_curso) {
      return NextResponse.json(
        { error: "Todos los campos son requeridos." },
        { status: 400 }
      );
    }
    try {
    // Obtener el número total de módulos del curso
    const numeromodulos = await prisma.cursos.findUnique({
      where: { id_curso },
      select: {
        sesiones: {
          select: {
            Modulos: {
              select: {
                id_modulo: true,
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

    // Contar cuántos módulos ha completado el usuario
    const modulosCompletados = await prisma.modulosCompletados.count({
      where: { id_contratista, id_curso },
    });

    // Calcular avance (redondeado hacia arriba)
    const nuevoAvance = Math.ceil((modulosCompletados / totalModules) * 100);

    // Determinar el estado según el avance
    let nuevoEstado = "Inscrito";
    if (nuevoAvance > 0 && nuevoAvance < 100) {
      nuevoEstado = "En progreso";
    } else if (nuevoAvance === 100) {
      nuevoEstado = "Finalizado";
    }

    // Actualizar el avance y el estado en Cursos_matriculados
    await prisma.cursos_Matriculados.updateMany({
      where: { id_contratista, id_curso },
      data: { avance: nuevoAvance, estado: nuevoEstado },
    });

    return NextResponse.json(
      { message: "Módulo completado y avance actualizado.", avance: nuevoAvance, estado: nuevoEstado },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error al registrar módulo y actualizar avance:", error);
    return NextResponse.json(
      { error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}