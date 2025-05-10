import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // 1. CURSOS POPULARES
    const cursos = await prisma.cursos.findMany({
      where: { activo: true },
      select: {
        id_curso: true,
        nombre_curso: true,
        Cursos_Matriculados: {
          select: { id_contratista: true },
        },
      },
    });

    const cursosConConteo = cursos.map(curso => ({
      id: curso.id_curso,
      nombre: curso.nombre_curso,
      total_inscritos: curso.Cursos_Matriculados.length,
    }));

    cursosConConteo.sort((a, b) => b.total_inscritos - a.total_inscritos);

    return NextResponse.json({
      resumenCursos: cursosConConteo
    });
  } catch (error) {
    console.error("Error al generar reporte:", error);
    return new NextResponse("Error interno del servidor", { status: 500 });
  }
}
