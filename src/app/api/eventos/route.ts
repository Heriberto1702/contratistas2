import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const year = parseInt(searchParams.get("year") || "");
  const month = parseInt(searchParams.get("month") || "");

  if (!year || !month) {
    return NextResponse.json(
      { error: "Año y mes son requeridos." },
      { status: 400 }
    );
  }

  try {
    const events = await prisma.eventos.findMany();

    // Filtrar eventos por año y mes procesando la fecha_hora como string
    const filteredEvents = events.filter((event) => {
      const eventDate = new Date(event.fecha_hora); // Convertir el string a Date
      return (
        eventDate.getFullYear() === year &&
        eventDate.getMonth() + 1 === month // getMonth es 0-indexado
      );
    });

    return NextResponse.json(filteredEvents);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al obtener los eventos." },
      { status: 500 }
    );
  }
}
