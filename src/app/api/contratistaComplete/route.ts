import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma"; // Asegúrate de que la ruta sea correcta

export async function GET() {
  try {
    // Obtener todas las especialidades de la base de datos
    const vista_contratistas = await prisma.vistaContratistasCompleta.findMany({
      select: {
        cruc: true,
        ccedula: true,
        xstoreID: true,
        nombre_registrado: true,
        nombre_contratista: true,
        apellidos: true,
        email: true,
        cid_club: true,
        tipo_club: true,
        activo: true,
      },
    });

    // Responder con las especialidades obtenidas
    return NextResponse.json(vista_contratistas, { status: 200 });
  } catch (error) {
    // En caso de error, responder con un error
    return NextResponse.json({ error: "Error al cargar las especialidades" }, { status: 500 });
  }
}