import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma"; // Asegúrate de que la ruta sea correcta

export async function GET() {
  try {
    // Obtener todas las especialidades de la base de datos
    const departamentos = await prisma.departamentos.findMany({
      select: {
        id_departamento: true,
        nombre_departamento: true,
      },
    });

    // Responder con las especialidades obtenidas
    return NextResponse.json(departamentos, { status: 200 });
  } catch (error) {
    // En caso de error, responder con un error
    return NextResponse.json({ error: "Error al cargar los departamentos" }, { status: 500 });
  }
}