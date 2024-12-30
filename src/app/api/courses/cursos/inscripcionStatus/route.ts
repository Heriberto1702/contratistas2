import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id_contratista = parseInt(searchParams.get("id_contratista") || "", 10);
  const id_curso = parseInt(searchParams.get("id_curso") || "", 10);

  if (isNaN(id_contratista) || !id_curso) {
    return NextResponse.json(
      { message: "Datos incompletos para verificar la inscripción." },
      { status: 400 }
    );
  }

  try {
    const enrollment = await prisma.cursos_Matriculados.findFirst({
      where: { id_contratista, id_curso },
    });

    return NextResponse.json({ isEnrolled: !!enrollment });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error al verificar la inscripción.", error: error.message || "Error desconocido." },
      { status: 500 }
    );
  }
}