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
        activo: false,
      },
    });

    // 2. Contratistas nuevos registrados por mes/año
    const nuevosPorMesRaw = await prisma.$queryRawUnsafe<any[]>(`
      SELECT 
        TO_CHAR(DATE_TRUNC('month', "created_at"), 'YYYY-MM') AS mes,
        COUNT(*) AS cantidad
      FROM "LoginPlataforma"
      WHERE "created_at" >= '2023-01-01'
      GROUP BY DATE_TRUNC('month', "created_at")
      ORDER BY mes;
    `);

    const nuevosPorMes = nuevosPorMesRaw.map((fila) => ({
      mes: fila.mes,
      cantidad: Number(fila.cantidad), // conversión de BigInt
    }));

    // 3. Distribución por tipo de contratista (natural vs jurídica)
    const contratistasNaturales = await prisma.contratistas.count({
      where: {
        cedula: {
          // Verificar que no sea nulo ni vacío
          not: "", // Se asegura de que no sea una cadena vacía
        },
      },
    });
    
    const contratistasJuridicos = await prisma.contratistas.count({
      where: {
        RUC: {
          // Verificar que no sea nulo ni vacío
          not: "", // Se asegura de que no sea una cadena vacía
        },
      },
    });

    const distribucionTipo = [
      { tipo: "Natural", cantidad: contratistasNaturales },
      { tipo: "Jurídico", cantidad: contratistasJuridicos },
    ];
    
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

    return NextResponse.json({
      activos,
      inactivos,
      nuevosPorMes,
      distribucionTipo,
      segmentacionClub,
    });
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return NextResponse.json(
      { error: "Error al obtener los datos de la API" },
      { status: 500 }
    );
  }
}
