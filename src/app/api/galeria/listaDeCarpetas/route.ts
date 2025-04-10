import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const uploadsPath = path.join(process.cwd(), "public/uploads");

    if (!fs.existsSync(uploadsPath)) {
      return NextResponse.json([]);
    }

    const folders = fs.readdirSync(uploadsPath).filter((folder) =>
      fs.statSync(path.join(uploadsPath, folder)).isDirectory()
    );

    return NextResponse.json(folders);
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener carpetas" }, { status: 500 });
  }
}
 