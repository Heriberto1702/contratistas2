import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Asegúrate de tener la instancia de Prisma configurada correctamente

export async function POST(req: Request) {
  try {
    const { cedula, RUC } = await req.json();

    if (!cedula && !RUC) {
      return NextResponse.json({ error: "Cédula o RUC es requerido." }, { status: 400 });
    }

    // Buscar el contratista por Cédula o RUC
    let contratista = null;

    if (cedula) {
      contratista = await prisma.contratistas.findFirst({
        where: {
          cedula: cedula,
        },
      });
    }

    if (RUC && !contratista) {
      contratista = await prisma.contratistas.findFirst({
        where: {
          RUC: RUC,
        },
      });
    }

    // Si se encuentra el contratista, devolver los datos necesarios
    if (contratista) {
      return NextResponse.json({
        found: true,
        nombre_registrado: contratista.nombre_registrado, // Incluye el nombre registrado
      });
    } else {
      return NextResponse.json({ found: false });
    }
  } catch (error) {
    console.error("Error en la validación del contratista:", error);
    return NextResponse.json(
      { error: "Error en la validación del RUC o Cédula." },
      { status: 500 }
    );
  }
}
