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

    // 2. MATRIZ DE PROGRESO POR CONTRATISTA Y CURSO
    const contratistas = await prisma.loginPlataforma.findMany({
      select: {
        id_contratista: true,
        nombres_contratista: true,
        apellidos_contratista: true,
        cedula: true,
        cedula_logueado: true,
        ruc: true,
        email: true,
        id_tipo_contratista: true, // Traemos el id_tipo_contratista
        tipoContratista: { // Relacionamos con la tabla Cliente para obtener el tipo
          select: {
            tipo_cliente: true, // Asumo que tipo_cliente es el campo que diferencia entre Natural y Jurídico
          },
        },
      },
    });

    const progresos = await prisma.cursos_Matriculados.findMany({
      select: {
        id_contratista: true,
        id_curso: true,
        avance: true, // Este es el campo clave que usaremos
      },
    });

    // Generamos el progreso de los contratistas
    const progresoContratistas = contratistas.map(contratista => {
      // Determinar si es natural o jurídico a partir del tipo_cliente
      const esJuridico = contratista.tipoContratista.tipo_cliente === "2"; // 2 es jurídico, asumido según el esquema

      const fila: any = {
        nombre: esJuridico
          ? `${contratista.ruc ?? "RUC no registrado"}` // RUC en vez de nombre
          : `${contratista.nombres_contratista} ${contratista.apellidos_contratista}`, // Nombre completo si es natural
        identificacion: esJuridico
          ? `${contratista.ruc ?? "RUC no registrado"}` // Si es jurídico, mostramos el RUC
          : `${contratista.cedula ?? "Cédula no registrada"}`, // Si es natural, mostramos la cédula
        email: contratista.email ?? "Email no registrado",
      };

      // Agregar progreso de cada curso para el contratista
      cursos.forEach(curso => {
        const registro = progresos.find(p =>
          p.id_contratista === contratista.id_contratista &&
          p.id_curso === curso.id_curso
        );

        fila[curso.nombre_curso] = registro ? `${registro.avance}%` : "0%";
      });

      return fila;
    });

    return NextResponse.json({
      resumenCursos: cursosConConteo,
      progresoContratistas,
    });
  } catch (error) {
    console.error("Error al generar reporte:", error);
    return new NextResponse("Error interno del servidor", { status: 500 });
  }
}
