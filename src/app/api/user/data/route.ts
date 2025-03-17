import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Ajusta la ruta según tu estructura
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/authOptions"; // Asegúrate de que `authOptions` esté correctamente exportado

export async function GET() {
  try {
    console.log("📌 Iniciando petición a la API de usuario");

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      console.log("❌ Usuario no autenticado");
      return NextResponse.json({ message: "Usuario no autenticado" }, { status: 401 });
    }

    const email = session.user.email;
    console.log("📌 Usuario autenticado:", email);

    // Consultar el usuario
    const user = await prisma.loginPlataforma.findUnique({
      where: { email },
      select: {
        id_contratista: true,
        ruc: true,
        cedula: true,
        nombres_contratista: true,
        apellidos_contratista: true,
        id_tipo_contratista: true,
        celular: true,
        email: true,
        id_departamento: true,
        id_municipio: true,
        id_especialidad: true,
        id_sexo: true,
        telefono_fijo: true,
        fecha_nacimiento: true
      },
    });

    if (!user) {
      console.log("❌ Usuario no encontrado en la base de datos");
      return NextResponse.json({ message: "Usuario no encontrado" }, { status: 404 });
    }

    console.log("✅ Usuario encontrado:", user);

    // Consultamos los catálogos completos
    const [departamentos, municipios, especialidades, sexos] = await Promise.all([
      prisma.departamentos.findMany(),  // Traemos todos los departamentos
      prisma.municipios.findMany(),     // Traemos todos los municipios
      prisma.especialidad.findMany(),   // Traemos todas las especialidades
      prisma.sexo.findMany(),           // Traemos todos los sexos
    ]);

    console.log("✅ Catálogos completos cargados");

    const cleanedRuc = user.ruc.trim();
    const cleanedCedula = user.cedula.trim();
    console.log("Consultando por RUC o cédula:", cleanedRuc, cleanedCedula);
    
    let contratista;
    
    if (cleanedRuc) {
      contratista = await prisma.contratistas.findFirst({
        where: { RUC: cleanedRuc },
        select: {
          nombre_registrado: true,
          id_tipo_club: true,
          RUC: true,
          cedula: true,
        },
      });
    } else if (cleanedCedula) {
      contratista = await prisma.contratistas.findFirst({
        where: { cedula: cleanedCedula },
        select: {
          nombre_registrado: true,
          id_tipo_club: true,
          RUC: true,
          cedula: true,
        },
      });
    }
    
    if (!contratista) {
      console.log("❌ Contratista no encontrado");
      return NextResponse.json({ message: "Contratista no encontrado" }, { status: 404 });
    }
    
    console.log("Contratista encontrado:", contratista);
    

    // Verificar si el club existe antes de asignarlo
    let club = null;
    if (contratista.id_tipo_club) {
      club = await prisma.club.findUnique({
        where: { id_tipo_club: contratista.id_tipo_club },
        select: { tipo_club: true },
      });
      console.log("📌 Nombre del club:", club ? club.tipo_club : "No encontrado");
    }

    // Consultamos el tipo de contratista relacionado
    const cliente = await prisma.cliente.findUnique({
      where: { id_tipo_contratista: user.id_tipo_contratista },
      select: { tipo_cliente: true },
    });

    console.log("📌 Nombre tipo contratista:", cliente);

    // 🔥 **Filtramos los datos del usuario** usando el `id_departamento`, `id_municipio`, `id_especialidad`, y `id_sexo`
    const [departamento, municipio, especialidad, sexo] = await Promise.all([
      prisma.departamentos.findUnique({
        where: { id_departamento: user.id_departamento },
      }),
      prisma.municipios.findUnique({
        where: { id_municipio: user.id_municipio },
      }),
      prisma.especialidad.findUnique({
        where: { id_especialidad: user.id_especialidad },
      }),
      prisma.sexo.findUnique({
        where: { id_sexo: user.id_sexo },
      }),
    ]);

    // Creamos la respuesta
    const response = {
      // Información completa del usuario
      nombres_contratista: user.nombres_contratista,
      apellidos_contratista: user.apellidos_contratista,
      id_contratista: user.id_contratista,
      ruc: user.ruc,
      email: user.email,
      id_tipo_contratista: user.id_tipo_contratista,
      cedula: user.cedula,
      celular: user.celular,
      nombre_club: club ? club.tipo_club : null, // Aseguramos que el nombre del club sea correctamente asignado
      tipo_contratista: cliente ? cliente.tipo_cliente : null,
      telefono_fijo: user.telefono_fijo,
      fecha_nacimiento: user.fecha_nacimiento,

      // Información filtrada por el usuario
      usuario_filtrado: {
        departamento,
        municipio,
        especialidad,
        sexo
      },

      // Datos de los catálogos completos
      catalogos: {
        departamentos,  // Todos los departamentos
        municipios,    // Todos los municipios
        especialidades, // Todas las especialidades
        sexos          // Todos los sexos
      },
    };

    console.log("✅ Respuesta enviada:", response);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching user data:", error);
    return NextResponse.json({ message: "Error fetching data" }, { status: 500 });
  }
}
