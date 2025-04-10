import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { NextResponse } from "next/server";
export async function GET(): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Usuario no autenticado" }, { status: 401 });
    }
    const { ruc, cedula } = session.user as { ruc?: string; cedula?: string };
    const whereCondition = ruc ? { RUC: ruc } : { cedula: cedula };
    const contratista = await prisma.contratistas.findFirst({
      where: whereCondition,
      include: {
        segmento: {
          select: { tipo_club: true },
        },
      },
    });
    if (!contratista) {
      return NextResponse.json({ error: "No se encontró el contratista" }, { status: 404 });
    }
    return NextResponse.json({ tipo_club: contratista.segmento?.tipo_club ?? null }, { status: 200 });
  } catch (error) {
    console.error("❌ Error al obtener contratista:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}