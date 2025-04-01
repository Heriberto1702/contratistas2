import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import AdmZip from "adm-zip";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const folder = formData.get("folder") as string;

    if (!file || !folder) {
      return NextResponse.json({ error: "Archivo y carpeta son requeridos" }, { status: 400 });
    }

    // Definir la ruta de la carpeta donde se extraerá el contenido
    const folderPath = path.join(process.cwd(), "public/uploads", folder);

    // Crear la carpeta si no existe
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    // Convertir archivo en buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    // Generar la ruta del archivo
    const filePath = path.join(folderPath, file.name);

    if (file.name.endsWith(".zip")) {
      // Guardar el archivo ZIP temporalmente
      fs.writeFileSync(filePath, buffer);

      // Extraer el contenido del ZIP
      const zip = new AdmZip(filePath);
      zip.extractAllTo(folderPath, true);
      console.log(`ZIP extraído en: ${folderPath}`);

      // Eliminar el archivo ZIP después de extraerlo
      try {
        fs.unlinkSync(filePath);
        console.log(`ZIP eliminado: ${filePath}`);
      } catch (unlinkError) {
        console.error(`Error al eliminar el ZIP: ${unlinkError}`);
      }

      return NextResponse.json({ message: "Archivo ZIP subido, extraído y eliminado con éxito" });
    } else {
      // Guardar archivos individuales si no es ZIP
      fs.writeFileSync(filePath, buffer);
      console.log("Imagen subida:", filePath);
      return NextResponse.json({ url: `/uploads/${folder}/${file.name}` });
    }
  } catch (error) {
    console.error("Error al procesar la subida:", error);
    return NextResponse.json({ error: "Error al subir el archivo" }, { status: 500 });
  }
}
