import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const cursos = await prisma.cursos.findMany({
      select:{
        nombre_curso:true,
        fecha_hora_Inicio:true,
        fecha_hora_Fin:true,
        descripcion:true,
        detalles_curso:true,
        hora:true,
      }
    });

    return NextResponse.json(cursos, { status: 200 });
  } catch (error) {
    console.error('Error al obtener los cursos:', error);
    return NextResponse.json({ error: 'Error al obtener los cursos.' }, { status: 500 });
  }
}