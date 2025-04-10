import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const categoria = url.searchParams.get("categoria");

  if (!categoria) {
    return NextResponse.json({ error: "Categoría no especificada" });
  }

  try {
    const basePath = path.join(process.cwd(), "public/uploads", categoria);
    const subcarpetas = fs.readdirSync(basePath).filter((file) =>
      fs.statSync(path.join(basePath, file)).isDirectory()
    );

    let galleryImages: string[] = [];

    subcarpetas.forEach((subcarpeta) => {
      const subPath = path.join(basePath, subcarpeta);
      const archivos = fs.readdirSync(subPath);
      const imagenes = archivos
        .filter((file) => /\.(jpg|jpeg|png|gif)$/i.test(file))
        .map((file) => `/uploads/${categoria}/${subcarpeta}/${file}`);

      galleryImages.push(...imagenes);
    });

    return NextResponse.json({ galleryImages });
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener imágenes de la categoría" });
  }
}
