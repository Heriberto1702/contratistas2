import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma"; // Asegúrate de que Prisma esté configurado correctamente

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Obtenemos los cursos desde la base de datos
    const courses = await prisma.cursos.findMany({
      include: {
        sesiones: true, // Incluye las sesiones si es necesario
      },
    });

    // Si no se encuentran cursos, devolvemos una lista vacía
    if (courses.length === 0) {
      res.status(200).json([]); // Respuesta vacía pero válida en formato JSON
      return;
    }

    // Devolvemos los cursos en formato JSON
    res.status(200).json(courses);
  } catch (error) {
    console.error("Error al obtener los cursos:", error);
    // Devolvemos un error en formato JSON
    res.status(500).json({ error: "Error al obtener los cursos" });
  }
}