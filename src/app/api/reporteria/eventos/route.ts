import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // 1. Total de contratistas activos
    const eventos = await prisma.eventos.findMany({
        select: {
          id_evento: true,
          nombre_evento: true,
          fecha_hora: true, 
          Eventos_Asistidos: {
            include: {
              LoginPlataforma: {
                select: {
                  nombres_contratista: true,
                  apellidos_contratista: true,
                  email: true,
                  cedula_logueado: true,
                  ruc: true,
                  cedula: true,
                }
              }
            }
          }
        }
      });
      const eventosConInscritos = eventos.map(evento => ({
        id_evento: evento.id_evento,
        nombre_evento: evento.nombre_evento,
        fecha_hora: new Date(evento.fecha_hora).toLocaleString('es-NI', {
          dateStyle: 'short',
          timeStyle: 'short'
        }),
        inscritos: evento.Eventos_Asistidos.map(asistencia => ({
          nombres_contratista: asistencia.LoginPlataforma.nombres_contratista,
          apellidos_contratista: asistencia.LoginPlataforma.apellidos_contratista,
          email: asistencia.LoginPlataforma.email,
          cedula_logueado: asistencia.LoginPlataforma.cedula_logueado,
          ruc: asistencia.LoginPlataforma.ruc,
          cedula: asistencia.LoginPlataforma.cedula,
        }))
      }));

    // Enviar todos los datos juntos
    return NextResponse.json(eventosConInscritos);
} catch (error) {
  console.error("Error al obtener los datos:", error);
  return NextResponse.json({ error: "Error al obtener los datos de la API" }, { status: 500 });
}
}
