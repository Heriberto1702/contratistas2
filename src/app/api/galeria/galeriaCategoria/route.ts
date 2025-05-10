import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { S3Client, PutObjectCommand,DeleteObjectCommand } from "@aws-sdk/client-s3";

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
// Función para eliminar un archivo de S3
const deleteFileFromS3 = async (url: string) => {
  try {
    const urlObj = new URL(url);
    const key = urlObj.pathname.substring(1); // Remover el slash inicial

    const command = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    await s3.send(command);
  } catch (error) {
    console.error("Error eliminando archivo de S3:", error);
    throw new Error("No se pudo eliminar el archivo de S3.");
  }
};

export async function DELETE(request: Request) {
  try {
    const {id_categoria} = await request.json();

    // Obtener la categoría y sus imágenes
    const categoria = await prisma.galeriaCategorias.findUnique({
      where: { id_categoria },
    });

    if (!categoria) {
      return NextResponse.json(
        { error: "Categoría no encontrada" },
        { status: 404 }
      );
    }

    // Eliminar la imagen principal de S3
    await deleteFileFromS3(categoria.imagen_principal);
       // Eliminar el registro de la base de datos
       await prisma.galeriaCategorias.delete({
        where: { id_categoria }
      });

    return NextResponse.json({ message: "Categoría eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar categoría:", error);
    return NextResponse.json(
      { error: "Error al eliminar la categoría" },
      { status: 500 }
    );
  }
}
export async function POST(request: Request) {
  try {
    const form = await request.formData();

    // Obtener los datos del formulario
    const nombre_categoria = form.get("nombre_categoria") as string;
    const imagen_principal = form.get("imagen_principal") as File;

    // Validar campos obligatorios
    if (!nombre_categoria || !imagen_principal) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios." },
        { status: 400 }
      );
    }

    // Subir imagen principal a S3
    const imagenUrl = await uploadFileToS3(imagen_principal, "galeria/categorias");

    // Crear la categoría en la base de datos
    const categoria = await prisma.galeriaCategorias.create({
      data: {
        nombre_categoria,
        imagen_principal: imagenUrl
      }
    });

    return NextResponse.json(categoria, { status: 201 });
  } catch (error) {
    console.error("Error al crear categoría:", error);
    return NextResponse.json(
      { error: "Error al crear la categoría. Inténtalo nuevamente." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const categorias = await prisma.galeriaCategorias.findMany({
      include: {
        imagenes: true
      },
      orderBy: {
        fecha_creacion: 'desc'
      }
    });
    return NextResponse.json(categorias);
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    return NextResponse.json(
      { error: "Error al obtener las categorías." },
      { status: 500 }
    );
  }
}

