import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const basePath = path.join(process.cwd(), "public/uploads");
    const categorias = fs.readdirSync(basePath).filter((file) =>
      fs.statSync(path.join(basePath, file)).isDirectory()
    );

    const categoriasData = categorias.map((categoria) => {
      const categoriaPath = path.join(basePath, categoria);
      const archivos = fs.readdirSync(categoriaPath);
      const imagenPrincipal = archivos.find((file) =>
        /\.(jpg|jpeg|png|gif)$/i.test(file)
      );

      return {
        nombre: categoria,
        imagen: imagenPrincipal
          ? `/uploads/${categoria}/${imagenPrincipal}`
          : "/default.jpg", // Imagen por defecto si no hay ninguna
      };
    });

    return NextResponse.json({ categorias: categoriasData });
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener categorías" });
  }
}
