import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma"; // Asegúrate de que la ruta sea correcta
import { promises as fs } from "fs";
import path from "path";

// Definir la carpeta donde se guardarán las imágenes
const uploadDir = path.join(process.cwd(), "public", "uploads");

// Asegurarse de que la carpeta de destino existe
async function ensureUploadDir() {
  try {
    await fs.mkdir(uploadDir, { recursive: true });
  } catch (error) {
    console.error("Error creando directorio de uploads:", error);
  }
}

export async function POST(request: Request) {
  // Asegurar que la carpeta para subir imágenes existe
  await ensureUploadDir();

  const form = await request.formData();

  // Obtener los datos del formulario
  const nombre_evento = form.get("nombre_evento") as string;
  const locacion = form.get("locacion") as string;
  const cupos = parseInt(form.get("cupos") as string, 10);
  const fecha_hora = form.get("fecha_hora") as string;
  const imagen_evento = form.get("imagen_evento") as File;

  if (!nombre_evento || !locacion || isNaN(cupos) || !fecha_hora || !imagen_evento) {
    return NextResponse.json(
      { error: "Faltan campos obligatorios." },
      { status: 400 }
    );
  }

  // Guardar la imagen localmente
  const fileExtension = path.extname(imagen_evento.name);
  const fileName = `${Date.now()}${fileExtension}`;
  const filePath = path.join(uploadDir, fileName);

  try {
    const arrayBuffer = await imagen_evento.arrayBuffer();
    await fs.writeFile(filePath, new Uint8Array(arrayBuffer));
  } catch (error) {
    console.error("Error al guardar la imagen:", error);
    return NextResponse.json(
      { error: "Error al subir la imagen." },
      { status: 500 }
    );
  }

  // Generar la URL de la imagen para guardar en la base de datos
  const imageUrl = `/uploads/${fileName}`;

  // Crear el registro en la base de datos
  try {
    const nuevoEvento = await prisma.eventos.create({
      data: {
        nombre_evento,
        locacion,
        cupos,
        fecha_hora,
        imagen_evento: imageUrl,
      },
    });

    return NextResponse.json(nuevoEvento, { status: 201 });
  } catch (error) {
    console.error("Error al registrar evento:", error);
    return NextResponse.json(
      { error: "Ocurrió un error al registrar el evento." },
      { status: 500 }
    );
  }
}
