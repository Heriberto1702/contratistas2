import { Resend } from "resend"; // Asegúrate de tener instalado el SDK de Resend

// Usamos la variable de entorno RESEND_API_KEY de .env.local
const resend = new Resend(process.env.RESEND_API_KEY as string); 

export const sendResetEmail = async (email: string, token: string) => {
  try {
    // Usamos la variable de entorno para la URL base de reset, que cambia según el entorno
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    await resend.emails.send({
      from: "onboarding@resend.dev",  // Asegúrate de usar tu dominio configurado para enviar correos
      to: email,
      subject: "Instrucciones para resetear tu contraseña",
      html: `<p>Haz clic en el siguiente enlace para resetear tu contraseña:</p>
             <p><a href="${baseUrl}/reset-password?token=${token}">Resetear Contraseña</a></p>`,
    });
  } catch (error) {
    console.error("Error enviando el correo:", error);
    throw new Error("Error al enviar el correo de reset.");
  }
};
