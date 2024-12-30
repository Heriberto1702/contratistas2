import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { id_contratista, id_curso } = await request.json();

    if (!id_contratista || !id_curso) {
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

    const existingEnrollment = await prisma.cursos_Matriculados.findFirst({
      where: { id_contratista: idContratistaInt, id_curso },
    });

    if (existingEnrollment) {
      return NextResponse.json(
        { message: "Ya estás inscrito en este curso." },
        { status: 409 }
      );
    }

    const newEnrollment = await prisma.cursos_Matriculados.create({
      data: {
        id_contratista: idContratistaInt,
        id_curso,
        avance: 0,
        estado: "Inscrito",
      },
    });

    return NextResponse.json(
      { message: "Inscripción registrada correctamente.", enrollment: newEnrollment },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error al registrar inscripción:", error.message || error);
    return NextResponse.json(
      { message: "Error al registrar la inscripción.", error: error.message || "Error desconocido." },
      { status: 500 }
    );
  }
}