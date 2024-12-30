import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === "GET") {
    const { userId } = request.query;

    if (!userId) {
      return response.status(400).json({ error: "El ID del usuario es requerido" });
    }

    try {
      const cursosMatriculados = await prisma.cursos_Matriculados.findMany({
        where: { id_contratista: Number(userId) },
        include: {
          Cursos: true, // Incluye detalles del curso
        },
      });

      response.status(200).json(cursosMatriculados);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "Error al obtener los cursos matriculados" });
    }
  } else {
    response.setHeader("Allow", ["GET"]);
    response.status(405).end(`Method ${request.method} Not Allowed`);
  }
}
