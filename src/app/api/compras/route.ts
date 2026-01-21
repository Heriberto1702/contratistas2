import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function GET() {
  try {
    // Obtener la sesión del usuario
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "No autenticado." }, { status: 401 });
    }

    const user = session.user;
   

    // Obtener el ruc y cedula directamente de la sesión
    const ruc = user.ruc;
    const cedula = user.cedula;

   
    // Determinar identification e idType
    let identification = "";
    let idType = "";

    if (ruc) {
      identification = ruc;
      idType = "RUC";
    } else if (cedula) {
      identification = cedula;
      idType = "CED";
    } else {
      return NextResponse.json({ error: "No se encontró RUC ni Cédula." }, { status: 400 });
    }
    const apiAuthToken = `${process.env.API_AUTH_TOKEN1}#${process.env.API_AUTH_TOKEN2}$${process.env.API_AUTH_TOKEN3}@${process.env.API_AUTH_TOKEN4}`;
    

    if (!apiAuthToken) {
      return NextResponse.json({ error: "Falta el token de autorización." }, { status: 500 });
    }
    // Construcción de la URL con parámetros correctos
    const apiUrl = `https://fastapi-stgm.onrender.com/marketing/app-contractors/tickets?identification=${identification}&id_type=${idType}`;

    // Hacer la petición a la API externa
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${apiAuthToken}`,
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
