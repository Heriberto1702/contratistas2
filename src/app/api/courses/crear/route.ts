import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma"; // Asegúrate de que Prisma esté configurado correctamente

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      // Desestructuramos todos los datos recibidos
      const {
        title,
        especialista,
        rubro,
        inicio,
        fin,
        hora,
        image,
        description,
        detalles,
        tipoCurso,
        recomendaciones,
        sections,
      } = req.body;


      // Crear el curso en la base de datos
      const newCourse = await prisma.cursos.create({
        data: {
          nombre_curso: title,         // Asignamos el nombre del curso
          descripcion: description,    // Asignamos la descripción del curso
          especialista: especialista,  // Asignamos el nombre del especialista
          fecha_hora_Inicio: new Date (inicio), // Asignamos la fecha de inicio
          fecha_hora_Fin: new Date (fin),      // Asignamos la fecha de fin
          hora: hora,                  // Asignamos la hora
          rubro: rubro,                // Asignamos el rubro
          recomendaciones: recomendaciones, // Asignamos las recomendaciones
          imagen_curso: image,         // Asignamos la imagen del curso
          detalles_curso: detalles,   // Asignamos detalles adicionales del curso
          tipo_curso: tipoCurso,       // Asignamos el tipo de curso

          sesiones: {
            create: sections.map((section: any) => ({
              nombre_sesion: section.title,       // Asignamos el nombre de la sesión
              descripcion: section.description,   // Asignamos la descripción de la sesión
              modulos: {
                create: section.modules.map((module: any) => ({
                  titulo_modulo: module.title,    // Asignamos el título del módulo
                  contenido: module.content,      // Asignamos el contenido del módulo
                  url: module.url,                // Asignamos la URL del módulo
                })),
              },
            })),
          },
        },
      });

      // Enviamos la respuesta con los datos del nuevo curso
      res.status(200).json({ success: true, course: newCourse });
    } catch (error) {
      console.error("Error al crear curso:", error);
      res.status(500).json({ success: false, error: "Error al crear el curso" });
    }
  } else {
    res.status(405).json({ success: false, error: "Método no permitido" });
  }
}