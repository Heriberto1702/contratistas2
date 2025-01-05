// src/app/api/validar-contratista/route.ts
import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma"; // Asegúrate de tener la instancia de Prisma configurada correctamente

export async function POST(req: Request) {
  try {
    const { cedula, RUC } = await req.json();

    if (!cedula && !RUC) {
      return NextResponse.json({ error: "Cédula o RUC es requerido." }, { status: 400 });
    }

    // Validar si la Cédula o el RUC existe en la tabla Contratistas
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

    if (contratista) {
      return NextResponse.json({ found: true });
    } else {
      return NextResponse.json({ found: false });
    }
  } catch (error) {
    return NextResponse.json({ error: "Error en la validación del RUC o Cédula." }, { status: 500 });
  }
}
