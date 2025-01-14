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
  const imagen_des_evento = form.get("imagen_des_evento") as File;
  const cupo_reservado = parseInt(form.get("cupo_reservado") as string, 10);

  if (
    !nombre_evento ||
    !locacion ||
    isNaN(cupos) ||
    !fecha_hora ||
    !imagen_evento ||
    !imagen_des_evento ||
    isNaN(cupo_reservado)
  ) {
    return NextResponse.json(
      { error: "Faltan campos obligatorios." },
      { status: 400 }
    );
  }

  // Guardar la imagen del evento principal localmente
  const fileExtension = path.extname(imagen_evento.name);
  const fileName = `${Date.now()}_main${fileExtension}`;
  const filePath = path.join(uploadDir, fileName);

  // Guardar la imagen descriptiva del evento localmente
  const fileExtension2 = path.extname(imagen_des_evento.name);
  const fileName2 = `${Date.now()}_desc${fileExtension2}`;
  const filePath2 = path.join(uploadDir, fileName2);

  try {
    const arrayBuffer = await imagen_evento.arrayBuffer();
    await fs.writeFile(filePath, new Uint8Array(arrayBuffer));

    const arrayBuffer2 = await imagen_des_evento.arrayBuffer();
    await fs.writeFile(filePath2, new Uint8Array(arrayBuffer2));
    
  } catch (error) {
    console.error("Error al guardar la imagen:", error);
    return NextResponse.json(
      { error: "Error al subir las imágenes." },
      { status: 500 }
    );
  }

  // Generar las URL de las imágenes para guardar en la base de datos
  const imageUrl = `/uploads/${fileName}`;
  const imageDesUrl = `/uploads/${fileName2}`;

  // Crear el registro en la base de datos
  try {
    const nuevoEvento = await prisma.eventos.create({
      data: {
        nombre_evento,
        locacion,
        cupos,
        fecha_hora,
        imagen_evento: imageUrl,
        imagen_des_evento: imageDesUrl,
        cupo_reservado,
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
