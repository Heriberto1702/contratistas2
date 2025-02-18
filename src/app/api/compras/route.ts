import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import prisma from "@/lib/prisma"; // Ajusta la importación según tu estructura

export async function GET() {
  try {
    // Obtener la sesión del usuario
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "No autenticado." }, { status: 401 });
    }

    const user = session.user;
    const id_contratista = Number(user.id_contratista);

    // Buscar en la base de datos si el contratista tiene RUC o Cédula
    const contratista = await prisma.loginPlataforma.findUnique({
      where: { id_contratista: id_contratista },
      select: { ruc: true, cedula: true }
    });

    if (!contratista) {
      return NextResponse.json({ error: "Contratista no encontrado." }, { status: 404 });
    }

    // Determinar identification e idType
    let identification = "";
    let idType = "";

    if (contratista.ruc) {
      identification = contratista.ruc;
      idType = "RUC";
    } else if (contratista.cedula) {
      identification = contratista.cedula;
      idType = "CED";
    } else {
      return NextResponse.json({ error: "No se encontró RUC ni Cédula." }, { status: 400 });
    }

    // Construcción de la URL con parámetros correctos
    const apiUrl = `https://fastapi-stgm.onrender.com/marketing/app-contractors/tickets?identification=${identification}&id_type=${idType}`;

    // Hacer la petición a la API externa
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Authorization": "Bearer Hy8K#mP9$vL2@nX5qR4tJ7wZ3cF6bN9d",
        "Content-Type": "application/json",
      }
    });

    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      return NextResponse.json({ error: `Error en la API: ${response.status}` }, { status: response.status });
    }

    // Obtener los datos de la respuesta
    const data = await response.json();

    // Retornar los datos recibidos de la API externa
    return NextResponse.json(data);
  } catch (error: any) {
    // Manejo de errores
    return NextResponse.json({ error: "Error interno del servidor", details: error.message }, { status: 500 });
  }
}
