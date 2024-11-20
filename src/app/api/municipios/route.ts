import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma"; // Asegúrate de que la ruta sea correcta

export async function GET() {
  try {
    // Obtener todas las especialidades de la base de datos
    const municipios = await prisma.municipios.findMany({
      select: {
        id_municipio: true,
        nombre_municipio: true,
      },
    });

    // Responder con las especialidades obtenidas
    return NextResponse.json(municipios, { status: 200 });
  } catch (error) {
    // En caso de error, responder con un error
    return NextResponse.json({ error: "Error al cargar los municipios" }, { status: 500 });
  }
}