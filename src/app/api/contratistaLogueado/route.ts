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
      select: {
        ruc: true,
        cedula: true,
        nombres_contratista: true,
        id_tipo_contratista: true,
      },
    });

    if (usuarios.length === 0) {
      return new Response('Usuario no encontrado', { status: 404 });
    }

    // Obtener los contratistas de Contratistas
    const contratistas = await prisma.contratistas.findMany({
      select: {
        RUC: true,
        cedula: true,
        nombre_registrado: true,
        id_tipo_club: true,
      },
    });

    // Obtener los clubes
    const clubes = await prisma.club.findMany({
      select: {
        id_tipo_club: true,
        tipo_club: true,
      },
    });

    // Asignar nombre del contratista y nivel (id_tipo_contratista) a los usuarios logueados
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
          nombres_contratista: user.nombres_contratista,
          ruc: user.ruc,
          cedula: user.cedula,
          nivel_contratista: user.id_tipo_contratista, // Nivel de contratista
          nombre_club: club ? club.tipo_club : null, // Nombre del club, si existe
        };
      }

      return {
        nombres_contratista: user.nombres_contratista,
        ruc: user.ruc,
        cedula: user.cedula,
        nivel_contratista: 'Desconocido', // Si no hay contratista
      };
    });

    return new Response(JSON.stringify(usuariosConTipoClub), { status: 200 });
  } catch (error) {
    console.error('Error fetching data:', error instanceof Error ? error.message : JSON.stringify(error));
    return new Response('Error fetching data', { status: 500 });
  }
}
