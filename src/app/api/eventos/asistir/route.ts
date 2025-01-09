import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { id_contratista, id_evento } = await request.json();

    if (!id_contratista || !id_evento) {
      return NextResponse.json(
        { message: "Datos incompletos para la inscripción." },
        { status: 400 }
      );
    }

    const idContratistaInt = parseInt(id_contratista, 10); // Convertir a número entero

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
        { message: "Evento no encontrado." },
        { status: 404 }
      );
    }

    // Verificar si el usuario ya está registrado en el evento
    const asistenciaExistente = await prisma.eventos_Asistidos.findFirst({
      where: { id_evento, id_contratista: idContratistaInt },
    });

    if (asistenciaExistente) {
      return NextResponse.json(
        { message: "Ya estás registrado en este evento." },
        { status: 409 }
      );
    }

    // Actualizar el número de cupos en la tabla Eventos
    const eventoActualizado = await prisma.eventos.update({
      where: { id_evento },
      data: {
        cupo_reservado: {
          increment: 1,
        },
        cupos:{
          decrement: 1,
        }
      },
    });

    // Registrar la asistencia del usuario en la tabla Eventos_Asistidos
    const asistencia = await prisma.eventos_Asistidos.create({
      data: {
        id_evento,
        id_contratista: idContratistaInt ,
      },
    });

    return NextResponse.json(
      { message: "Asistencia registrada correctamente.", evento: eventoActualizado, asistencia },
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