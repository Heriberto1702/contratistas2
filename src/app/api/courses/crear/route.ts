import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";


const bucketName = process.env.AWS_S3_BUCKET_NAME;
const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;


if (!bucketName || !region || !accessKeyId || !secretAccessKey) {
  throw new Error("Faltan variables de entorno de AWS. Verifica tu archivo .env.");
}

const s3 = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

// Función para subir un archivo a S3
const uploadFileToS3 = async (file: File, folder: string) => {
  try {
    const fileName = `${folder}/${Date.now()}-${file.name}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: fileName,
      Body: buffer,
      ContentType: file.type,
    });

    await s3.send(command);
    return `https://${bucketName}.s3.${region}.amazonaws.com/${fileName}`;
  } catch (error) {
    console.error("Error subiendo archivo a S3:", error);
    throw new Error("No se pudo subir el archivo a S3.");
  }
};

export async function POST(request: Request) {
  
  try {
 const form = await request.formData();

  const nombre_curso = form.get("nombre_curso") as string;
  const descripcion = form.get("descripcion") as string;
  const especialista = form.get("especialista") as string;
  const fecha_hora_Inicio = form.get("fecha_hora_Inicio") as string;
  const fecha_hora_Fin = form.get("fecha_hora_Fin") as string;
  const hora = form.get("hora") as string;
  const rubro = form.get("rubro") as string;
  const recomendaciones = form.get("recomendaciones") as string;
  const imagen_curso = form.get("imagen_curso") as File;
  const detalles_curso = form.get("detalles_curso") as string;
  const tipo_curso = form.get("tipo_curso") as string;
  const sesionesRaw = form.get("sesiones") as string;

  // Procesar el campo "sesiones"
  let sesiones: any[] = [];
  try {
    sesiones = JSON.parse(sesionesRaw); // Convertir el JSON a un arreglo
  } catch (error) {
    console.error("Error al procesar sesiones:", error);
    return NextResponse.json(
      { error: "El campo 'sesiones' debe ser un JSON válido." },
      { status: 400 }
    );
  }

  // Validación de datos de entrada
  if (!nombre_curso || sesiones.length === 0 || !imagen_curso) {
    return NextResponse.json(
      { error: "Datos incompletos: falta nombre_curso, imagen_curso o sesiones." },
      { status: 400 }
    );
  }

 // Subir la imagen a S3
 const imageUrl = await uploadFileToS3(imagen_curso, "imagen_cursos");


  // Validación de fechas
  let inicio, fin;
  try {
    inicio = new Date(fecha_hora_Inicio);
    fin = new Date(fecha_hora_Fin);
  } catch (error) {
    return NextResponse.json(
      { error: "Las fechas proporcionadas no tienen un formato válido." },
      { status: 400 }
    );
  }

  if (isNaN(inicio.getTime()) || isNaN(fin.getTime())) {
    return NextResponse.json(
      { error: "Las fechas proporcionadas no son válidas." },
      { status: 400 }
    );
  }

    // Crear el curso con sus sesiones y módulos
    const curso = await prisma.cursos.create({
      data: {
        nombre_curso,
        descripcion,
        especialista,
        fecha_hora_Inicio: inicio,
        fecha_hora_Fin: fin,
        hora,
        rubro,
        recomendaciones,
        imagen_curso: imageUrl, // Guardar la URL de la imagen
        detalles_curso,
        tipo_curso,
        sesiones: {
          create: sesiones.map((sesion: any) => ({
            nombre_sesion: sesion.nombre_sesion,
            descripcion: sesion.descripcion,
            fecha_hora: new Date(sesion.fecha_hora),
            Modulos: {
              create: sesion.modulos.map((modulo: any) => ({
                titulo_modulo: modulo.titulo_modulo,
                contenido: modulo.contenido,
              })),
            },
          })),
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Curso creado con éxito",
        data: curso,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error al crear el curso:", error.message);
      return NextResponse.json(
        {
          error: "Error al guardar el curso.",
          details: error.message,
        },
        { status: 500 }
      );
    } else {
      console.error("Error desconocido:", error);
      return NextResponse.json(
        {
          error: "Error desconocido al guardar el curso.",
        },
        { status: 500 }
      );
    }
  }
}