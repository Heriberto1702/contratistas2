import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // 1. Total de contratistas activos
    const activos = await prisma.contratistas.count({
      where: {
        activo: true,
      },
    });
    const inactivos = await prisma.contratistas.count({
      where: {
        activo: false, // Asegúrate de que el estado es 'inactivo'
      },
    });
    // 2. Contratistas nuevos registrados por mes/año (Comentado, pero lo dejo aquí para referencia futura)
    /*const nuevosPorMes = await prisma.loginPlataforma.groupBy({
      by: [
        prisma.$queryRaw`DATE_TRUNC('month', createdAt)`, 
      ],
      _count: {
        id: true,
      },
      where: {
        createdAt: {
          gte: new Date("2023-01-01"), 
          lte: new Date(),
        },
      },
    });*/

    // 3. Distribución por tipo de contratista (natural vs jurídica)
    const contratistasConTipo = await prisma.loginPlataforma.findMany({
      include: {
        tipoContratista: true,
      },
    });

    const distribucionTipo: Record<string, number> = {};
    contratistasConTipo.forEach((c) => {
      const tipo = c.tipoContratista?.tipo_cliente || "No definido";
      distribucionTipo[tipo] = (distribucionTipo[tipo] || 0) + 1;
    });

    // Convertir distribucionTipo a un array de objetos
    const distribucionTipoArray = Object.entries(distribucionTipo).map(([key, value]) => ({
      tipo: key,
      cantidad: value,
    }));

    // 4. Segmentación por club (Gold, Platinum, etc.)
    const contratistasConClub = await prisma.contratistas.findMany({
      include: {
        segmento: true,
      },
    });

    const segmentacionClub: Record<string, number> = {};
    contratistasConClub.forEach((contratista) => {
      const nombreClub = contratista.segmento?.tipo_club || "No definido";
      segmentacionClub[nombreClub] = (segmentacionClub[nombreClub] || 0) + 1;
    });

    // Enviar todos los datos juntos
    return NextResponse.json({
      activos,
      inactivos,
      distribucionTipo: distribucionTipoArray, // Ahora es un array
      segmentacionClub,
    });
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return NextResponse.json({ error: "Error al obtener los datos de la API" }, { status: 500 });
  }
}
