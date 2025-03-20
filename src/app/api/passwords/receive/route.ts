import { NextRequest, NextResponse } from "next/server";
import prisma from '../../../../lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { token, newPassword } = await req.json();

    // Validar que se enviaron los datos correctos
    if (!token || !newPassword) {
      return NextResponse.json({ message: "Datos inválidos." }, { status: 400 });
    }

    // Buscar el token en la base de datos
    const tokenRecord = await prisma.accesoPasswords.findFirst({
      where: { reset_token: token  },
    });

    // Verificar si el token es válido y no ha expirado
    if (!tokenRecord || !tokenRecord.reset_expires || new Date() > tokenRecord.reset_expires) {
      return NextResponse.json({ message: "Token inválido o expirado." }, { status: 400 });
    }

    // Encriptar la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Actualizar la contraseña en LoginPlataforma
    await prisma.loginPlataforma.update({
      where: { email: tokenRecord.email },
      data: { password: hashedPassword },
    });

    // Eliminar el token de la base de datos
    await prisma.accesoPasswords.delete({
      where: { email: tokenRecord.email },
    });

    return NextResponse.json({ message: "Contraseña actualizada correctamente." });
  } catch (error) {
    console.error("Error al restablecer contraseña:", error);
    return NextResponse.json({ message: "Error interno del servidor." }, { status: 500 });
  }
}
