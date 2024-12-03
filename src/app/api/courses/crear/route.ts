import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

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

  // Validación de datos de entrada
  if (!nombre_curso || !sesiones || !Array.isArray(sesiones)) {
    return NextResponse.json({ error: 'Datos incompletos: falta nombre_curso o sesiones.' }, { status: 400 });
  }

  // Validación de fechas, asegurándose de que el formato sea adecuado
  let inicio, fin;
  try {
    inicio = new Date(fecha_hora_Inicio);
    fin = new Date(fecha_hora_Fin);
  } catch (error) {
    return NextResponse.json({ error: 'Las fechas proporcionadas no tienen un formato válido.' }, { status: 400 });
  }

  // Asegúrate de que las fechas sean válidas
  if (isNaN(inicio.getTime()) || isNaN(fin.getTime())) {
    return NextResponse.json({ error: 'Las fechas proporcionadas no son válidas.' }, { status: 400 });
  }

  try {
    // Crear el curso con sus sesiones y módulos
    const curso = await prisma.cursos.create({
      data: {
        nombre_curso,
        descripcion,
        especialista,
        fecha_hora_Inicio: inicio,
        fecha_hora_Fin: fin,
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
            Modulos: {
              create: sesion.modulos.map((modulo: any) => ({
                titulo_modulo: modulo.titulo_modulo,
                contenido: modulo.contenido,
              })),
            },
          })),
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Curso creado con éxito',
      data: curso,
    }, { status: 201 });
  } catch (error: unknown) {
    // Verificación de tipo de error
    if (error instanceof Error) {
      // Ahora puedes acceder a las propiedades de "error" sin problemas
      console.error('Error al crear el curso:', error.message);
      return NextResponse.json({
        error: 'Error al guardar el curso.',
        details: error.message,
      }, { status: 500 });
    } else {
      // En caso de que el error no sea una instancia de Error
      console.error('Error desconocido:', error);
      return NextResponse.json({
        error: 'Error desconocido al guardar el curso.',
      }, { status: 500 });
    }
  }
}