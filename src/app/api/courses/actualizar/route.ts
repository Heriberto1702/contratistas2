import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const cursoId = searchParams.get("id");

  if (!cursoId || isNaN(parseInt(cursoId))) {
    return NextResponse.json({ error: "ID de curso no válido o no proporcionado" }, { status: 400 });
  }

  const cursoIdNum = parseInt(cursoId);

  try {
    const form = await request.formData();
    const nombre_curso = form.get("nombre_curso")?.toString().trim();
    const descripcion = form.get("descripcion")?.toString().trim();
    const especialista = form.get("especialista")?.toString().trim();
    const fecha_hora_Inicio = form.get("fecha_hora_Inicio")?.toString();
    const fecha_hora_Fin = form.get("fecha_hora_Fin")?.toString();
    const hora = form.get("hora")?.toString();
    const rubro = form.get("rubro")?.toString();
    const recomendaciones = form.get("recomendaciones")?.toString();
    const detalles_curso = form.get("detalles_curso")?.toString();
    const tipo_curso = form.get("tipo_curso")?.toString();
    const sesionesRaw = form.get("sesiones")?.toString();

    if (!nombre_curso || !descripcion || !especialista) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    // Validación y conversión segura de fechas
    let fechaInicio = fecha_hora_Inicio ? new Date(fecha_hora_Inicio) : undefined;
    let fechaFin = fecha_hora_Fin ? new Date(fecha_hora_Fin) : undefined;

    if (fechaInicio && isNaN(fechaInicio.getTime())) {
      return NextResponse.json({ error: "La fecha de inicio no es válida." }, { status: 400 });
    }
    if (fechaFin && isNaN(fechaFin.getTime())) {
      return NextResponse.json({ error: "La fecha de fin no es válida." }, { status: 400 });
    }

    let sesiones: any[] = [];
    try {
      sesiones = sesionesRaw ? JSON.parse(sesionesRaw) : [];
      if (!Array.isArray(sesiones)) throw new Error();
    } catch {
      return NextResponse.json(
        { error: "El campo 'sesiones' debe ser un JSON válido." },
        { status: 400 }
      );
    }

    // Verificar si el curso existe antes de actualizar
    const existingCurso = await prisma.cursos.findUnique({
      where: { id_curso: cursoIdNum },
      include: { sesiones: true }, // Obtener sesiones existentes
    });

    if (!existingCurso) {
      return NextResponse.json({ error: "Curso no encontrado" }, { status: 404 });
    }

    // Actualizar el curso principal
    const updatedCurso = await prisma.cursos.update({
      where: { id_curso: cursoIdNum },
      data: {
        nombre_curso,
        descripcion,
        especialista,
        fecha_hora_Inicio: fechaInicio,
        fecha_hora_Fin: fechaFin,
        hora,
        rubro,
        recomendaciones,
        detalles_curso,
        tipo_curso,
      },
    });

    // Manejo de sesiones en paralelo
    const sessionPromises = sesiones.map(async (sesion) => {
      const { id_sesion, nombre_sesion, descripcion, fecha_hora, Modulos } = sesion;

      if (id_sesion) {
        // Si la sesión ya existe, actualizarla
        await prisma.sesiones.update({
          where: { id_sesion },
          data: {
            nombre_sesion,
            descripcion,
            fecha_hora: fecha_hora ? new Date(fecha_hora) : "",
          },
        });

        // Manejo de módulos dentro de la sesión
        if (Array.isArray(Modulos)) {
          const moduloPromises = Modulos.map(async (modulo: { id_modulo?: number; titulo_modulo: string; contenido: string }) => {
            if (modulo.id_modulo) {
              await prisma.modulos.update({
                where: { id_modulo: modulo.id_modulo },
                data: {
                  titulo_modulo: modulo.titulo_modulo,
                  contenido: modulo.contenido,
                },
              });
            } else {
              await prisma.modulos.create({
                data: {
                  titulo_modulo: modulo.titulo_modulo,
                  contenido: modulo.contenido,
                  id_sesion,
                },
              });
            }
          });
          await Promise.all(moduloPromises);
        }
      } else {
        // Si la sesión no existe, crearla junto con los módulos
        await prisma.sesiones.create({
          data: {
            id_curso: cursoIdNum,
            nombre_sesion,
            descripcion,
            fecha_hora: fecha_hora ? new Date(fecha_hora) : "",
            Modulos: {
              create: Array.isArray(Modulos)
                ? Modulos.map((modulo: { titulo_modulo: string; contenido: string }) => ({
                    titulo_modulo: modulo.titulo_modulo,
                    contenido: modulo.contenido,
                  }))
                : [],
            },
          },
        });
      }
    });

    // Ejecutar todas las promesas de sesiones en paralelo
    await Promise.all(sessionPromises);

    return NextResponse.json(
      { success: true, message: "Curso actualizado con éxito", data: updatedCurso },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al actualizar el curso:", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error("Prisma error code:", (error as Prisma.PrismaClientKnownRequestError).code);
      console.error("Prisma error meta:", (error as Prisma.PrismaClientKnownRequestError).meta);
    } else if (error instanceof Error) {
      console.error("Error message:", (error as Error).message);
    }
    return NextResponse.json(
      { error: "Error al actualizar el curso.", details: error instanceof Error ? error.message : JSON.stringify(error) },
      { status: 500 }
    );
  }
}
