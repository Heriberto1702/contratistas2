import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { id_evento, id_contratista } = await request.json();

    if (!id_evento || !id_contratista) {
      return NextResponse.json(
        { message: "Datos incompletos para la asistencia." },
        { status: 400 }
      );
    }

    // Actualizar el número de cupos en la tabla Eventos
    const evento = await prisma.eventos.update({
      where: { id_evento },
      data: {
        cupo_reservado: {
          increment: 1,
        },
      },
    });

    // Registrar la asistencia del usuario en la tabla Eventos_Asistidos
    const asistencia = await prisma.eventos_Asistidos.create({
      data: {
        id_evento,
        id_contratista,
      },
    });

    return NextResponse.json(
      { message: "Asistencia registrada correctamente.", evento, asistencia },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error al registrar asistencia:", error.message || error);
    return NextResponse.json(
      { message: "Error al registrar la asistencia.", error: error.message || "Error desconocido." },
      { status: 500 }
    );
  }
}