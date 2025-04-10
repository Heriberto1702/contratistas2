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
    const idCursoInt = parseInt(id_curso, 10); // Asegurarse de que id_curso sea un número entero

    if (isNaN(idContratistaInt)) {
      return NextResponse.json(
        { message: "ID del contratista no válido." },
        { status: 400 }
      );
    }

    if (isNaN(idCursoInt)) {
      return NextResponse.json(
        { message: "ID del curso no válido." },
        { status: 400 }
      );
    }

    // Registrar la inscripción en la base de datos
    const newEnrollment = await prisma.cursos_Matriculados.create({
      data: {
        id_contratista: idContratistaInt,
        id_curso: idCursoInt,
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
