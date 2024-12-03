import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id_curso = searchParams.get('id');

  if (!id_curso) {
    return NextResponse.json({ error: 'ID del curso es requerido.' }, { status: 400 });
  }

  try {
    const curso = await prisma.cursos.findUnique({
      where: { id_curso: parseInt(id_curso, 10) },
      include: {
        sesiones: {
          include: {
            Modulos: true,
          },
        },
      },
    });

    if (!curso) {
      return NextResponse.json({ error: 'Curso no encontrado.' }, { status: 404 });
    }

    return NextResponse.json(curso, { status: 200 });
  } catch (error) {
    console.error('Error al obtener el curso:', error);
    return NextResponse.json({ error: 'Error al obtener el curso.' }, { status: 500 });
  }
}