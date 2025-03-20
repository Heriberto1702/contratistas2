// src/app/api/passwords/route.ts

import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import { sendResetEmail } from "../../../../lib/resend";
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  
  console.log("Email recibido: ", email);  // Para depurar si estamos recibiendo el correo

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Verificar si el correo está presente
if (!emailRegex.test(email)) {
  return NextResponse.json({ message: "Por favor ingrese un correo válido." }, { status: 400 });
}

  try {
    // Verificar si el correo electrónico está registrado
    const user = await prisma.loginPlataforma.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ message: "El correo no está registrado." }, { status: 404 });
    }

    // Generar un token único
    const resetToken = crypto.randomBytes(32).toString("hex");
// Guardar el token en la tabla AccesoPasswords, con una fecha de expiración
const expiration = new Date();
expiration.setHours(expiration.getHours() + 1); // El token expira en 1 hora

await prisma.accesoPasswords.upsert({
  where: { email },
  update: {
    reset_token: resetToken,
    reset_expires: expiration,
  },
  create: {
    email,
    reset_token: resetToken,
    reset_expires: expiration,
    password: '', // Add default empty password
  },
});

// Enviar el correo de restablecimiento (comentareamos para modo testing)
await sendResetEmail(email, resetToken); 

return NextResponse.json({
  message: "Correo enviado con instrucciones para restablecer la contraseña.",
});
} catch (error) {
console.error("Error al procesar la solicitud:", error);
return NextResponse.json(
  { message: "Hubo un error al procesar la solicitud." },
  { status: 500 }
);
}
}