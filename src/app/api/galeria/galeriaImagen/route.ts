import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

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

// Función para eliminar un archivo de S3
const deleteFileFromS3 = async (url: string) => {
  try {
    const urlObj = new URL(url);
    const key = urlObj.pathname.substring(1);

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

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const id_categoria = parseInt(form.get("id_categoria") as string);
    const imagenes = form.getAll("imagenes") as File[];

    if (!id_categoria || imagenes.length === 0) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios." },
        { status: 400 }
      );
    }

    const uploadedImagenes = await Promise.all(
      imagenes.map(async (imagen) => {
        const url = await uploadFileToS3(imagen, `galeria/categorias/${id_categoria}`);
        return prisma.galeriaImagenes.create({
          data: {
            id_categoria,
            url_imagen: url,
            nombre_archivo: imagen.name,
          },
        });
      })
    );

    return NextResponse.json(uploadedImagenes, { status: 201 });
  } catch (error) {
    console.error("Error al subir imágenes:", error);
    return NextResponse.json(
      { error: "Error al subir las imágenes. Inténtalo nuevamente." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id_imagen } = await request.json();

    const imagen = await prisma.galeriaImagenes.findUnique({
      where: { id_imagen },
    });

    if (!imagen) {
      return NextResponse.json(
        { error: "Imagen no encontrada" },
        { status: 404 }
      );
    }

    // Eliminar la imagen de S3
    await deleteFileFromS3(imagen.url_imagen);

    // Eliminar el registro de la base de datos
    await prisma.galeriaImagenes.delete({
      where: { id_imagen },
    });

    return NextResponse.json({ message: "Imagen eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar imagen:", error);
    return NextResponse.json(
      { error: "Error al eliminar la imagen. Inténtalo nuevamente." },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const categoria = url.searchParams.get("categoria");

    // Si se especifica una categoría, filtramos las imágenes
    let imagenes;
    if (categoria) {
      // Convertir el parámetro de categoría a número
      const categoriaId = parseInt(categoria);
      
      if (isNaN(categoriaId)) {
        return NextResponse.json(
          { error: "El ID de la categoría no es válido." },
          { status: 400 }
        );
      }
    
      imagenes = await prisma.galeriaImagenes.findMany({
        where: {
          id_categoria: categoriaId,
        },
        select: {
          url_imagen: true,
        },
        orderBy: {
          fecha_subida: "desc",
        },
      });
    } else {
      // Si no se especifica categoría, devolvemos todas las imágenes para el admin
      imagenes = await prisma.galeriaImagenes.findMany({
        orderBy: {
          fecha_subida: "desc",
        },
      });
    }

    // Devolvemos solo los URLs de las imágenes para el componente Galeria
    const urls = imagenes.map((img) => img.url_imagen);
    return NextResponse.json({ imagenes: urls });
  } catch (error) {
    console.error("Error al obtener imágenes:", error);
    return NextResponse.json(
      { error: "Error al obtener las imágenes." },
      { status: 500 }
    );
  }
}
