import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { id_contratista, nombres_contratista, apellidos_contratista, celular, telefono_fijo } = data;

    // Verifica que `id_contratista` no sea undefined
    if (!id_contratista) {
      return new NextResponse("El id_contratista es requerido", { status: 400 });
    }

    const updatedUser = await prisma.loginPlataforma.update({
      where: { id_contratista },
      data: {
        nombres_contratista,
        apellidos_contratista,
        celular,
        telefono_fijo,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    return new NextResponse("Hubo un problema al actualizar el usuario", { status: 500 });
  }
}