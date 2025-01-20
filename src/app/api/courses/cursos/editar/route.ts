import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Instancia de Prisma

export async function PUT(req: Request) {
  try {
    const { id_curso, nombre_curso, descripcion, recomendaciones, imagen_curso, detalles_curso, tipo_curso, especialista, hora, rubro, fecha_hora_Inicio, fecha_hora_Fin } = await req.json();

    // Validación de los datos
    if (!id_curso || !nombre_curso || !descripcion || !fecha_hora_Inicio || !fecha_hora_Fin) {
      return NextResponse.json({ error: 'Faltan datos necesarios' }, { status: 400 });
    }

    // Actualizar el curso
    const curso = await prisma.cursos.update({
      where: { id_curso },
      data: {
        nombre_curso,
        descripcion,
        recomendaciones,
        imagen_curso,
        detalles_curso,
        tipo_curso,
        especialista,
        hora,
        rubro,
        fecha_hora_Inicio,
        fecha_hora_Fin,
      },
    });

    return NextResponse.json(curso);
  } catch (error) {
    return NextResponse.json({ error: 'Error al editar el curso' }, { status: 500 });
  }
}
