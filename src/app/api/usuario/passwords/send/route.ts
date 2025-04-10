import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendResetEmail } from "@/lib/resend";
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  const normalizedEmail = email.trim().toLowerCase(); // 🔹 Normalizar el correo

  console.log("Email recibido: ", normalizedEmail);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(normalizedEmail)) {
    return NextResponse.json({ message: "Por favor ingrese un correo válido." }, { status: 400 });
  }

  try {
    const user = await prisma.loginPlataforma.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      return NextResponse.json({ message: "El correo no está registrado." }, { status: 404 });
    }

    // 🔹 Verificar si ya hay un token activo para este usuario
    const existingToken = await prisma.accesoPasswords.findFirst({
      where: { email: normalizedEmail, reset_expires: { gt: new Date() } },
    });

    if (existingToken) {
      return NextResponse.json({ message: "Ya se ha enviado un correo con instrucciones. Revisa tu bandeja de entrada." });
    }

    // 🔹 Generamos el token y lo hasheamos antes de guardarlo
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = await bcrypt.hash(resetToken, 10);

    // 🔹 Guardamos solo el token hasheado en la base de datos
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);

    await prisma.accesoPasswords.upsert({
      where: { email: normalizedEmail },
      update: { reset_token: hashedToken, reset_expires: expiration },
      create: { email: normalizedEmail, reset_token: hashedToken, reset_expires: expiration, password: '' },
    });

    // 🔹 Enviar el token original por correo
    await sendResetEmail(normalizedEmail, resetToken);

    return NextResponse.json({ message: "Correo enviado con instrucciones para restablecer la contraseña." });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    return NextResponse.json({ message: "Hubo un error al procesar la solicitud." }, { status: 500 });
  }
}
