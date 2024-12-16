import { NextResponse } from "next/server";
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Obtener todos los eventos de la base de datos
    const eventos = await prisma.eventos.findMany({
      orderBy: {
        fecha_hora: "asc", // Ordenar por fecha
      },
    });

    // Retornar la respuesta en formato JSON
    return NextResponse.json(eventos, { status: 200 });
  } catch (error) {
    console.error("Error al obtener eventos:", error);
    return NextResponse.json(
      { error: "Ocurrió un error al obtener los eventos." },
      { status: 500 }
    );
  }
}


