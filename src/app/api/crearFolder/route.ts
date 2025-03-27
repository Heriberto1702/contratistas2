import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const { folderName } = await req.json();

    if (!folderName) {
      return NextResponse.json({ error: "El nombre de la carpeta es requerido" }, { status: 400 });
    }

    const folderPath = path.join(process.cwd(), "public/uploads", folderName);

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
      return NextResponse.json({ message: `Carpeta '${folderName}' creada` });
    } else {
      return NextResponse.json({ error: "La carpeta ya existe" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Error al crear la carpeta" }, { status: 500 });
  }
}
