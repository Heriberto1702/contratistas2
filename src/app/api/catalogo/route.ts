import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Asegúrate de que la conexión Prisma esté configurada correctamente.

export async function GET() {
  try {
    // Obtener los datos de las tablas
    const [sexos, especialidades, departamentos, municipios] = await Promise.all([
      prisma.sexo.findMany(),
      prisma.especialidad.findMany(),
      prisma.departamentos.findMany(),
      prisma.municipios.findMany(),
    ]);

    // Devolver la respuesta
    return NextResponse.json({
      sexos,
      especialidades,
      departamentos,
      municipios,
    });
  } catch (error) {
    console.error('Error al obtener los catálogos:', error);
    return NextResponse.error();
  }
}
