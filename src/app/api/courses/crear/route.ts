import { NextResponse } from 'next/server';
import prisma  from '@/lib/prisma';

export async function POST(req: Request) {
  const {
    nombre_curso,
    descripcion,
    especialista,
    fecha_hora_Inicio,
    fecha_hora_Fin,
    hora,
    rubro,
    recomendaciones,
    imagen_curso,
    detalles_curso,
    tipo_curso,
    sesiones,
  } = await req.json();

  if (!nombre_curso || !sesiones || !Array.isArray(sesiones)) {
    return NextResponse.json({ error: 'Datos incompletos.' }, { status: 400 });
  }

  try {
    const curso = await prisma.cursos.create({
      data: {
        nombre_curso,
        descripcion,
        especialista,
        fecha_hora_Inicio: new Date(fecha_hora_Inicio),
        fecha_hora_Fin: new Date(fecha_hora_Fin),
        hora,
        rubro,
        recomendaciones,
        imagen_curso,
        detalles_curso,
        tipo_curso,
        sesiones: {
          create: sesiones.map((sesion: any) => ({
            nombre_sesion: sesion.nombre_sesion,
            descripcion: sesion.descripcion,
            fecha_hora: new Date(sesion.fecha_hora),
            modulos: {
              create: sesion.modulos.map((modulo: any) => ({
                titulo_modulo: modulo.titulo_modulo,
                contenido: modulo.contenido,
              })),
            },
          })),
        },
      },
    });

    return NextResponse.json(curso, { status: 201 });
  } catch (error) {
    console.error('Error al crear el curso:', error);
    return NextResponse.json({ error: 'Error al guardar el curso.' }, { status: 500 });
  }
}