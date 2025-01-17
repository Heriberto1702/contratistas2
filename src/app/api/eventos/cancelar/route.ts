import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { id_contratista, id_evento } = await request.json();

    if (!id_contratista || !id_evento) {
      return NextResponse.json(
        { message: "Datos incompletos para cancelar la inscripción." },
        { status: 400 }
      );
    }

    const idContratistaInt = parseInt(id_contratista, 10);

    if (isNaN(idContratistaInt)) {
      return NextResponse.json(
        { message: "ID del contratista no válido." },
        { status: 400 }
      );
    }

    // Verificar si el evento existe
    const evento = await prisma.eventos.findUnique({
      where: { id_evento },
    });

    if (!evento) {
      return NextResponse.json(
        { message: "El evento no existe." },
        { status: 404 }
      );
    }

    // Actualizar el número de cupos en la tabla Eventos
    const eventoActualizado = await prisma.eventos.update({
      where: { id_evento },
      data: {
        cupo_reservado: {
          decrement: 1, // Liberar cupo reservado
        },
        cupos: {
          increment: 1, // Aumentar cupos totales
        },
      },
    });

    // Eliminar la asistencia del usuario
    const asistencia = await prisma.eventos_Asistidos.deleteMany({
      where: {
        id_evento,
        id_contratista: idContratistaInt,
      },
    });

    return NextResponse.json(
      {
        message: "Registro eliminado correctamente.",
        evento: eventoActualizado,
        asistencia,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error al eliminar asistencia:", error.message || error);
    return NextResponse.json(
      { message: "Error al eliminar la asistencia.", error: error.message },
      { status: 500 }
    );
  }
}
