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
    const especialista = form.get("especialista") as string | null;
    const rubro = form.get("rubro") as string | null;
    const recomendaciones = form.get("recomendaciones") as string;
    const imagen_curso = form.get("imagen_curso") as File;
    const tipo_curso = form.get("tipo_curso") as string;
    const sesionesRaw = form.get("sesiones") as string | null;

    let sesiones: any[] = [];

    if (sesionesRaw) {
      try {
        sesiones = JSON.parse(sesionesRaw);
      } catch (error) {
        console.error("Error al procesar sesiones:", error);
        return NextResponse.json(
          { error: "El campo 'sesiones' debe ser un JSON válido." },
          { status: 400 }
        );
      }
    }

    if (!nombre_curso || !imagen_curso) {
      return NextResponse.json(
        { error: "Datos incompletos: falta nombre_curso o imagen_curso." },
        { status: 400 }
      );
    }

    const imageUrl = await uploadFileToS3(imagen_curso, "imagen_cursos");

    // Crear el curso sin sesiones
    const curso = await prisma.cursos.create({
      data: {
        nombre_curso,
        descripcion,
        especialista: especialista || null, // Si no está presente, guardamos `null`
        rubro: rubro || null, // Si no está presente, guardamos `null`
        recomendaciones,
        imagen_curso: imageUrl,
        tipo_curso,
      },
    });

    // Si hay sesiones, crearlas en la BD
    if (sesiones.length > 0) {
      for (const sesion of sesiones) {
        const nuevaSesion = await prisma.sesiones.create({
          data: {
            nombre_sesion: sesion.nombre_sesion,
            descripcion: sesion.descripcion,
            id_curso: curso.id_curso, // Relacionar con el curso recién creado
          },
        });

        // Si hay módulos, crearlos en la BD
        if (sesion.modulos && sesion.modulos.length > 0) {
          await prisma.modulos.createMany({
            data: sesion.modulos.map((modulo: any) => ({
              titulo_modulo: modulo.titulo_modulo,
              contenido: modulo.contenido,
              recursopdf: modulo.recursopdf,
              id_sesion: nuevaSesion.id_sesion, // Relacionar con la sesión recién creada
            })),
          });
        }
      }
    }

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
