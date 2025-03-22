import { Resend } from "resend";

// Inicializar Resend con la API Key desde .env.local
const resend = new Resend(process.env.RESEND_API_KEY as string);

export const sendResetEmail = async (email: string, token: string) => {
  if (!email || !email.includes("@")) {
    throw new Error("Correo inválido.");
  }

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const resetUrl = `${baseUrl}/validador-token?token=${token}`;

    const response = await resend.emails.send({
      from: "onboarding@resend.dev",  // ⚠️ Cambia esto por un remitente válido en Resend
      to: email,
      subject: "🔑 Recuperación de contraseña2",
      html: `
        <p>Hola,</p>
        <p>Hemos recibido una solicitud para restablecer tu contraseña.</p>
        <p><a href="${resetUrl}" style="padding:10px 20px; background:#007bff; color:#fff; text-decoration:none; border-radius:5px;">
          Resetear Contraseña
        </a></p>
        <p>Si no solicitaste esto, puedes ignorar este mensaje.</p>
        <p>Gracias,</p>
        <p>El equipo de soporte Desarrollo Web</p>
      `,
    });

    console.log("Correo de reset enviado:", response);
    return response;
  } catch (error) {
    console.error("Error enviando el correo:", error);
    throw new Error("Error al enviar el correo de reset.");
  }
};
