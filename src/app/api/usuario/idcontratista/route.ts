import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"; // Asegúrate de importar las opciones de autenticación correctas

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "No autenticado." },
        { status: 401 }
      );
    }

    const user = session.user;
    const id_contratista = user.id_contratista; // Asegúrate de que el id_contratista esté en la sesión

    return NextResponse.json({ id_contratista });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error al obtener el ID del contratista.", error: error.message || "Error desconocido." },
      { status: 500 }
    );
  }
}