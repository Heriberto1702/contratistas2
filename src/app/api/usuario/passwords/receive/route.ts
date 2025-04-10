import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

// 🔹 GET para validar el token antes de mostrar el formulario
export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get("token");

    if (!token) {
      return NextResponse.json({ valid: false, message: "Token no proporcionado." }, { status: 400 });
    }

    // 🔹 Buscar todos los tokens no expirados
    const tokenRecords = await prisma.accesoPasswords.findMany({
      where: { reset_expires: { gt: new Date() } },
      select: { reset_token: true },
    });

    for (const record of tokenRecords) {
      if (await bcrypt.compare(token, record.reset_token || "")) {
        return NextResponse.json({ valid: true });
      }
    }

    return NextResponse.json({ valid: false, message: "Token inválido o expirado." }, { status: 400 });
  } catch (error) {
    console.error("Error al validar el token:", error);
    return NextResponse.json({ valid: false, message: "Error interno del servidor." }, { status: 500 });
  }
}

// 🔹 POST para cambiar la contraseña después de validar el token
export async function POST(req: NextRequest) {
  try {
    const { token, newPassword } = await req.json();

    if (!token || !newPassword) {
      return NextResponse.json({ message: "Datos inválidos." }, { status: 400 });
    }

    // 🔹 Buscar todos los tokens no expirados
    const tokenRecords = await prisma.accesoPasswords.findMany({
      where: { reset_expires: { gt: new Date() } },
      select: { email: true, reset_token: true },
    });

    let validTokenRecord = null;

    // 🔹 Comparar el token con los almacenados en la BD
    for (const record of tokenRecords) {
      if (await bcrypt.compare(token, record.reset_token || "")) {
        validTokenRecord = record;
        break;
      }
    }

    if (!validTokenRecord) {
      return NextResponse.json({ message: "Token inválido o expirado." }, { status: 400 });
    }

    // 🔹 Encriptar la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 🔹 Actualizar la contraseña en `LoginPlataforma`
    await prisma.loginPlataforma.update({
      where: { email: validTokenRecord.email },
      data: { password: hashedPassword },
    });

    // 🔹 Eliminar el token de `AccesoPasswords`
    await prisma.accesoPasswords.delete({
      where: { email: validTokenRecord.email },
    });

    return NextResponse.json({ message: "Contraseña actualizada correctamente." });
  } catch (error) {
    console.error("Error al restablecer contraseña:", error);
    return NextResponse.json({ message: "Error interno del servidor." }, { status: 500 });
  }
}
