import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const {
      email,
      password,
      nombres, // Cambiado a 'nombres'
      apellidos, // Cambiado a 'apellidos'
      cedula,
      RUC,
      celular,
      cedula_logueado, //opcional
      telefono_fijo, // Añadido el teléfono fijo
      id_cargo, //opcional
      id_sexo,
      id_especialidad,
      fecha_nacimiento,
      id_departamento,
      id_municipio,
      id_tipo_contratista, // Agregado el id_tipo_contratista
    } = await req.json();

    // Validación de campos obligatorios
    if (
      !email ||
      !password ||
      !nombres || // Validación para 'nombres'
      !apellidos || // Validación para 'apellidos'
      !celular ||
      !id_sexo ||
      !id_especialidad ||
      !fecha_nacimiento ||
      !id_departamento ||
      !id_municipio ||
      !id_tipo_contratista // Validación para el 'id_tipo_contratista'
    ) {
      return NextResponse.json(
        { error: "Por favor, completa todos los campos obligatorios." },
        { status: 400 }
      );
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Por favor, proporciona un correo electrónico válido." },
        { status: 400 }
      );
    }

   
    // Validar formato de celular (ejemplo genérico, ajusta según tu país)
    const phoneRegex = /^[0-9]{8}$/;
    if (!phoneRegex.test(celular.toString())) {
      return NextResponse.json(
        { error: "El número de celular debe tener 8 dígitos." },
        { status: 400 }
      );
    }

    // Verificar que al menos cedula o RUC esté presente
    if (!cedula && !RUC) {
      return NextResponse.json(
        { error: "Debe proporcionar al menos cédula o RUC." },
        { status: 400 }
      );
    }

    // Verificar si el email ya está registrado
    const existingUser = await prisma.loginPlataforma.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "El correo electrónico ya está registrado." },
        { status: 400 }
      );
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario
    const user = await prisma.loginPlataforma.create({
      data: {
        email,
        password: hashedPassword,
        nombres_contratista: nombres, // Usar el campo 'nombres'
        apellidos_contratista: apellidos, // Usar el campo 'apellidos'
        cedula: cedula,
        ruc: RUC,
        celular,
        cedula_logueado: cedula_logueado || null,
        telefono_fijo: telefono_fijo || null, // ✅ Manejo opcional
        fecha_nacimiento,
        depart: { connect: { id_departamento: id_departamento } },
        especialidad: { connect: { id_especialidad: id_especialidad } },
        muni: { connect: { id_municipio: id_municipio } },
        sex: { connect: { id_sexo: id_sexo } },
        tipoContratista: { connect: { id_tipo_contratista: id_tipo_contratista } },
      // 🔗 Relación opcional si se envía
      ...(id_cargo && {
        cargo: { connect: { id_cargo } },
      }),
    },
  });

    // Retornar datos del usuario creado
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    return NextResponse.json(
      { error: "Ocurrió un error al procesar el registro." },
      { status: 500 }
    );
  }
}