import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma"; // Asegúrate de que la ruta sea correcta
import path from "path";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// Definir la carpeta donde se guardarán las imágenes
//const uploadDir = path.join(process.cwd(), "public", "uploads");

const bucketName = process.env.AWS_S3_BUCKET_NAME;
const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

if (!bucketName || !region || !accessKeyId || !secretAccessKey) {
  throw new Error("Faltan variables de entorno de AWS. Verifica tu archivo .env.");
}

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// Asegurarse de que la carpeta de destino existe
//async function ensureUploadDir() {
  //try {
    //await fs.mkdir(uploadDir, { recursive: true });
  //} catch (error) {
    //console.error("Error creando directorio de uploads:", error);
  //}
//}



export async function POST(request: Request) {
  // Asegurar que la carpeta para subir imágenes existe
  //await ensureUploadDir();

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

  const uploadFileToS3 = async (file: File, folder: string) => {
    const fileName = `${folder}/${Date.now()}-${file.name}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: fileName,
      Body: buffer,
      ContentType: file.type,
    });

    const response = await s3.send(command);
    return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
  };

  try {
    // Subir ambas imágenes a S3

    const eventoImageUrl = await uploadFileToS3 (imagen_evento, "eventos");
    const descriptivaImageUrl = await uploadFileToS3 (imagen_des_evento, "descriptivas");


  // Crear el registro en la base de datos

    const nuevoEvento = await prisma.eventos.create({
      data: {
        nombre_evento,
        locacion,
        cupos,
        fecha_hora,
        imagen_evento: eventoImageUrl,
        imagen_des_evento: descriptivaImageUrl,
        cupo_reservado,
      },
    });

    return new Response(JSON.stringify(nuevoEvento), { status: 201 });
  } catch (error) {
    console.error("Error al registrar evento:", error);
    return new Response(JSON.stringify({ error: "Error al registrar el evento." }), { status: 500 });
  }
}
