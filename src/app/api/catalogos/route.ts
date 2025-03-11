import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma"; // Ajusta la ruta según tu estructura

export async function GET() {
  try {
    // Realizamos todas las consultas en paralelo con Promise.all
    const [departamentos, municipios, especialidades, sexos] = await Promise.all([
      prisma.departamentos.findMany({
        select: { id_departamento: true, nombre_departamento: true },
      }),
      prisma.municipios.findMany({
        select: { id_municipio: true, nombre_municipio: true },
      }),
      prisma.especialidad.findMany({
        select: { id_especialidad: true, nombre_especialidad: true },
      }),
      prisma.sexo.findMany({
        select: { id_sexo: true, sexo: true },
      }),
    ]);

    // Retornamos todos los datos en un solo JSON
    return NextResponse.json({
      departamentos,
      municipios,
      especialidades,
      sexos,
    }, { status: 200 });
  } catch (error) {
    console.error("Error en el endpoint de datos unificados:", error);
    return NextResponse.json({ error: "Error al cargar los datos" }, { status: 500 });
  }
}