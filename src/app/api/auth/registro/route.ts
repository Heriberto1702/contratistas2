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
      telefono_fijo,
      id_tipo_contratista,
      id_sexo,
      id_especialidad,
      fecha_nacimiento,
      id_departamento,
      id_municipio,
    } = await req.json();

    // Validación de campos obligatorios
    if (
      !email ||
      !password ||
      !nombres || // Validación para 'nombres'
      !apellidos || // Validación para 'apellidos'
      !celular ||
      !id_tipo_contratista ||
      !id_sexo ||
      !id_especialidad ||
      !fecha_nacimiento ||
      !id_departamento ||
      !id_municipio
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
        cedula: cedula || null,
        RUC: RUC || null,
        celular,
        telefono_fijo: telefono_fijo || null,
        id_tipo_contratista,
        id_sexo,
        id_especialidad,
        fecha_nacimiento: new Date(fecha_nacimiento),
        id_departamento,
        id_municipio,
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