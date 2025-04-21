import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "No autenticado." }, { status: 401 });
  }

  const url = new URL(request.url);
  const id_evento = url.searchParams.get("id_evento");

  try {
    if (id_evento) {
      const evento = await prisma.eventos.findUnique({
        where: {
          id_evento: parseInt(id_evento),
        },
      });

      if (!evento) {
        return NextResponse.json(
          { error: "Evento no encontrado" },
          { status: 404 }
        );
      }

      return NextResponse.json(evento);
    }

    // Si no se pasa `id_evento`, obtener todos los eventos
    const eventos = await prisma.eventos.findMany({
      orderBy: {
        id_evento: "asc",
      },
    });

    return NextResponse.json(eventos);
  } catch (error) {
    console.error("Error al obtener eventos:", error);
    return NextResponse.json(
      { error: "Ocurrió un error al obtener los eventos." },
      { status: 500 }
    );
  }
}
