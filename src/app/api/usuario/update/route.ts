import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { 
      id_contratista,
      nombres_contratista,
      apellidos_contratista,
      celular,
      telefono_fijo,
      ruc,
      email,
      fecha_nacimiento,  // Este campo es string en formato 'YYYY-MM-DD'
      id_sexo,
      id_especialidad,
      id_departamento,
      id_municipio,
      id_tipo_contratista,
      cedula_logueado,
      id_cargo
    } = data;

    // Verifica que `id_contratista` no sea undefined
    if (!id_contratista) {
      return new NextResponse("El id_contratista es requerido", { status: 400 });
    }

   
 
    // Convierte los valores de los campos desplegables a enteros
    const idSexoInt = parseInt(id_sexo, 10);
    const idEspecialidadInt = parseInt(id_especialidad, 10);
    const idDepartamentoInt = parseInt(id_departamento, 10);
    const idMunicipioInt = parseInt(id_municipio, 10);
    const idTipoContratistaInt = parseInt(id_tipo_contratista, 10);
    const idCargoInt = parseInt(id_cargo, 10);

    // Verifica que las conversiones a números sean correctas
    if (isNaN(idSexoInt) || isNaN(idEspecialidadInt) || isNaN(idDepartamentoInt) || isNaN(idMunicipioInt) || isNaN(idTipoContratistaInt)|| isNaN(idCargoInt)) {
      return new NextResponse("Los valores de los campos desplegables deben ser números válidos", { status: 400 });
    }

    // Actualiza los datos del usuario en la base de datos
    const updatedUser = await prisma.loginPlataforma.update({
      where: { id_contratista },
      data: {
        nombres_contratista,
        apellidos_contratista,
        celular,
        telefono_fijo,
        ruc,
        email,
        fecha_nacimiento, // Usamos el formato ISO para la fecha
        cedula_logueado,
        id_sexo: idSexoInt,  // Asigna el valor convertido
        id_especialidad: idEspecialidadInt, // Asigna el valor convertido
        id_departamento: idDepartamentoInt, // Asigna el valor convertido
        id_municipio: idMunicipioInt, // Asigna el valor convertido
        id_tipo_contratista: idTipoContratistaInt, // Asigna el valor convertido
        id_cargo: idCargoInt
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    return new NextResponse("Hubo un problema al actualizar el usuario", { status: 500 });
  }
}