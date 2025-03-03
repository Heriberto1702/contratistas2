// src/app/api/contratistaLogueado/route.ts
import prisma from '../../../lib/prisma';
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";

export async function GET() {
  try {
    // Obtener la sesión del usuario logueado
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new Response('Usuario no autenticado', { status: 401 });
    }

    const email = session.user.email;

    // Obtener el usuario logueado
    const usuarios = await prisma.loginPlataforma.findMany({
      where: {
        email: email, // Filtramos por el email del usuario logueado
      },
    });

    if (usuarios.length === 0) {
      return new Response('Usuario no encontrado', { status: 404 });
    }

    // Obtener los contratistas de Contratistas
    const contratistas = await prisma.contratistas.findMany();

    // Obtener los clubes
    const clubes = await prisma.club.findMany();

    // Asignar id_tipo_club y nombre del club al usuario logueado según RUC o cédula
    const usuariosConTipoClub = usuarios.map(user => {
      let contratista;

      if (user.cedula) {
        contratista = contratistas.find(contractor => contractor.cedula === user.cedula);
      }

      if (user.ruc && !contratista) {
        contratista = contratistas.find(contractor => contractor.RUC === user.ruc);
      }

      if (contratista) {
        const club = clubes.find(c => c.id_tipo_club === contratista.id_tipo_club);

        return { 
          ...user, 
          activo: contratista.activo,
          nombre_registrado: contratista.nombre_registrado,
          xstoreID: contratista.xstoreID,
          id_tipo_club: contratista.id_tipo_club, 
          nombre_club: club ? club.tipo_club : null // Nombre del club
        };
      }

      return user; // Si no se encuentra contratista
    });

    return new Response(JSON.stringify(usuariosConTipoClub), { status: 200 });
  } catch (error) {
    console.error('Error fetching data:', error instanceof Error ? error.message : JSON.stringify(error));
    return new Response('Error fetching data', { status: 500 });
  }
}
