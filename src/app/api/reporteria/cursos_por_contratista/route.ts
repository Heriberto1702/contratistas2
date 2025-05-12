// src/app/api/admin/reporte-cursos/route.ts

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Obtener todos los usuarios con sus cursos matriculados
    const usuarios = await prisma.loginPlataforma.findMany({
      select: {
        id_contratista: true,
        nombres_contratista: true,
        apellidos_contratista: true,
        email: true,
        cedula: true,
        cedula_logueado: true,
        Cursos_Matriculados: {
          include: {
            Cursos: {
              select: {
                id_curso: true,
                nombre_curso: true,
                especialista: true
              }
            }
          }
        }
      }
    });

    // Formatear la respuesta para que sea más fácil de usar en el frontend
    const usuariosFormateados = usuarios.map(usuario => ({
      id_contratista: usuario.id_contratista,
      nombre_completo: `${usuario.nombres_contratista} ${usuario.apellidos_contratista}`,
      email: usuario.email,
      cedula: usuario.cedula || usuario.cedula_logueado,
      cursos: usuario.Cursos_Matriculados.map(matricula => ({
        id_curso: matricula.Cursos.id_curso,
        nombre_curso: matricula.Cursos.nombre_curso,
        especialista: matricula.Cursos.especialista,
        avance: matricula.avance,
        estado: matricula.estado
      }))
    }));

    return NextResponse.json(usuariosFormateados);
  } catch (error) {
    console.error("Error al obtener el reporte de cursos:", error);
    return NextResponse.json(
      { error: "Error al obtener el reporte de cursos" },
      { status: 500 }
    );
  }
}