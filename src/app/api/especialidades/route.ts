import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma"; // Asegúrate de que la ruta sea correcta

export async function GET() {
  try {
    // Obtener todas las especialidades de la base de datos
    const especialidades = await prisma.especialidad.findMany({
      select: {
        id_especialidad: true,
        nombre_especialidad: true,
      },
    });

    // Responder con las especialidades obtenidas
    return NextResponse.json(especialidades, { status: 200 });
  } catch (error) {
    // En caso de error, responder con un error
    return NextResponse.json({ error: "Error al cargar las especialidades" }, { status: 500 });
  }
}