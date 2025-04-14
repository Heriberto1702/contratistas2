// src/app/api/contratistas-login/obtenerTipoClub/route.ts
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Obtener los usuarios logueados de LoginPlataforma
    const usuarios = await prisma.loginPlataforma.findMany();

    // Obtener los contratistas de Contratistas
    const contratistas = await prisma.contratistas.findMany();

    // Obtener los clubes
    const clubes = await prisma.club.findMany();

    // Asignar id_tipo_club y nombre del club al usuario logueado según RUC o cédula
    const usuariosConTipoClub = usuarios.map(user => {
      let contratista;

      // Si el usuario tiene cédula, comparar con la cédula de los contratistas
      if (user.cedula) {
        contratista = contratistas.find(contractor => contractor.cedula === user.cedula);
      }
      // Si el usuario tiene RUC, comparar con el RUC de los contratistas
      if (user.ruc && !contratista) {
        contratista = contratistas.find(contractor => contractor.RUC === user.ruc);
      }

      // Si se encuentra un contratista con la cédula o RUC
      if (contratista) {
        console.log(`Usuario ${user.cedula || user.ruc} encontrado con id_tipo_club: ${contratista.id_tipo_club}`);
        
        // Buscar el nombre del club usando el id_tipo_club
        const club = clubes.find(c => c.id_tipo_club === contratista.id_tipo_club);

        return { 
          ...user, 
          activo: contratista.activo,
          nombre_registrado: contratista.nombre_registrado,
          xstoreID: contratista.xstoreID,
          id_tipo_club: contratista.id_tipo_club, 
          nombre_club: club ? club.tipo_club : null // Asignamos el nombre del club o null si no se encuentra
        };
      } else {
        console.log(`No se encontró contratista para el usuario ${user.cedula || user.ruc}`);
        // Si no se encuentra el contratista, se retorna el usuario sin cambios
        return user;
      }
    });

    // Consolidar la respuesta con los usuarios, id_tipo_club y nombre_club
    return new Response(JSON.stringify(usuariosConTipoClub), { status: 200 });
  } catch (error) {
    console.error('Error fetching data:', error instanceof Error ? error.message : JSON.stringify(error));
    return new Response('Error fetching data', { status: 500 });
  }
}
