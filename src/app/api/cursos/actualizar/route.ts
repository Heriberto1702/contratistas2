import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";


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
    const rubro = form.get("rubro")?.toString();
    const activoRaw = form.get("activo");
    const destacadoRaw = form.get("destacado");
    const activo = activoRaw === "true" || activoRaw === "on";
    const destacado = destacadoRaw === "true" || destacadoRaw === "on";
    const recomendaciones = form.get("recomendaciones")?.toString();
    const tipo_curso = form.get("tipo_curso")?.toString();
    const sesionesRaw = form.get("sesiones")?.toString();

    if (!nombre_curso || !descripcion ) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
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
        rubro,
        activo,
        destacado,
        recomendaciones,
        tipo_curso,
      },
    });

    // Manejo de sesiones en paralelo
    const sessionPromises = sesiones.map(async (sesion) => {
      const { id_sesion, nombre_sesion, descripcion, Modulos } = sesion;

      if (id_sesion) {
        // Si la sesión ya existe, actualizarla
        await prisma.sesiones.update({
          where: { id_sesion },
          data: {
            nombre_sesion,
            descripcion,
          },
        });

        // Manejo de módulos dentro de la sesión
        if (Array.isArray(Modulos)) {
          const moduloPromises = Modulos.map(async (modulo: { id_modulo?: number; titulo_modulo: string; contenido: string, recursopdf:string }) => {
            if (modulo.id_modulo) {
              await prisma.modulos.update({
                where: { id_modulo: modulo.id_modulo },
                data: {
                  titulo_modulo: modulo.titulo_modulo,
                  contenido: modulo.contenido,
                  recursopdf: modulo.recursopdf,
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
            Modulos: {
              create: Array.isArray(Modulos)
                ? Modulos.map((modulo: { titulo_modulo: string; contenido: string, recursopdf: string }) => ({
                    titulo_modulo: modulo.titulo_modulo,
                    contenido: modulo.contenido,
                    recursopdf: modulo.recursopdf,
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

    return NextResponse.json(
      { error: "Error al actualizar el curso.", details: error instanceof Error ? error.message : JSON.stringify(error) },
      { status: 500 }
    );
  }
}
