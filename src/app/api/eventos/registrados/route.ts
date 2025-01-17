import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export async function GET() {
  try {
    // Obtener la sesión del usuario logueado
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id_contratista) {
      return NextResponse.json(
        { error: "No estás autenticado o no tienes el id_contratista en tu sesión." },
        { status: 401 }
      );
    }

    // Obtener el id_contratista desde la sesión
    const id_contratista = Number(session.user.id_contratista);

    if (isNaN(id_contratista)) {
      return NextResponse.json(
        { error: "ID del contratista no válido." },
        { status: 400 }
      );
    }

    // Obtener todos los eventos asistidos del contratista
    const eventosAsistidos = await prisma.eventos_Asistidos.findMany({
      where: { id_contratista },
      select: { id_evento: true }, // Retorna solo los IDs de eventos para optimizar
    });

    return NextResponse.json(eventosAsistidos, { status: 200 });
  } catch (error: any) {
    console.error("Error al obtener los eventos asistidos:", error);
    return NextResponse.json(
      { error: "Ocurrió un error al obtener los eventos asistidos." },
      { status: 500 }
    );
  }
}
