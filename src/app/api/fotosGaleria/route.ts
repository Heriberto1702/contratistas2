import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const folder = searchParams.get("folder");

    if (!folder) {
      return NextResponse.json({ error: "Se requiere el folder" }, { status: 400 });
    }

    const mainFolderPath = path.join(process.cwd(), "public/uploads", folder);

    if (!fs.existsSync(mainFolderPath)) {
      return NextResponse.json({ error: "La carpeta no existe" }, { status: 404 });
    }

    // Buscar la foto principal en la carpeta principal
    const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
    const mainImageFile = fs.readdirSync(mainFolderPath).find(file => 
      allowedExtensions.includes(path.extname(file).toLowerCase())
    );

    const mainImage = mainImageFile ? `/uploads/${folder}/${mainImageFile}` : null;

    // Buscar subcarpetas dentro de la carpeta principal
    const subfolders = fs.readdirSync(mainFolderPath).filter(subfolder => {
      const subfolderPath = path.join(mainFolderPath, subfolder);
      return fs.statSync(subfolderPath).isDirectory();
    });

    if (subfolders.length === 0) {
      return NextResponse.json({ error: "No se encontraron fotos dentro de la categoría" }, { status: 404 });
    }

    // Obtener todas las imágenes de todas las subcarpetas
    let allGalleryImages: string[] = [];

    subfolders.forEach(subfolder => {
      const galleryFolderPath = path.join(mainFolderPath, subfolder);

      // Obtener imágenes dentro de cada subcarpeta
      const galleryImages = fs.readdirSync(galleryFolderPath).filter(file => 
        allowedExtensions.includes(path.extname(file).toLowerCase())
      ).map(file => `/uploads/${folder}/${subfolder}/${file}`);

      allGalleryImages = allGalleryImages.concat(galleryImages); // Concatenar las imágenes de cada subcarpeta
    });

    return NextResponse.json({
      mainImage,
      galleryImages: allGalleryImages, // Devolver todas las imágenes de todas las subcarpetas
    });

  } catch (error) {
    console.error("Error al obtener imágenes:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
