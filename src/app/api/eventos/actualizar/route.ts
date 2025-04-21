import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function PUT(request: Request) {
    try {
      const { searchParams } = new URL(request.url);
      const eventoId = searchParams.get("id");
  
      if (!eventoId || isNaN(parseInt(eventoId))) {
        return NextResponse.json({ error: "ID de evento no válido o no proporcionado" }, { status: 400 });
      }
  
      const eventoIdNum = parseInt(eventoId);
      const form = await request.formData();
  
      // ✅ Solo obtenemos campos que SÍ queremos
      const nombre_evento = form.get("nombre_evento")?.toString().trim();
      const fecha_hora = form.get("fecha_hora")?.toString();
      const locacion = form.get("locacion")?.toString().trim();
      const cupos = parseInt(form.get("cupos")?.toString() || "0");
      const cupo_reservado = parseInt(form.get("cupo_reservado")?.toString() || "0");
  
      if (!nombre_evento || !fecha_hora || !locacion) {
        return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
      }
  
      const existingEvento = await prisma.eventos.findUnique({
        where: { id_evento: eventoIdNum },
      });
  
      if (!existingEvento) {
        return NextResponse.json({ error: "Evento no encontrado" }, { status: 404 });
      }
  
      // ✅ Solo se actualizan estos campos, ignorando imagen
      const updatedEvento = await prisma.eventos.update({
        where: { id_evento: eventoIdNum },
        data: {
          nombre_evento,
          fecha_hora,
          locacion,
          cupos,
          cupo_reservado,
        },
      });
  
      return NextResponse.json({ success: true, message: "Evento actualizado con éxito", data: updatedEvento }, { status: 200 });
    } catch (error) {
      console.error("Error al actualizar el evento:", error);
      return NextResponse.json(
        { error: "Error al actualizar el evento", details: error instanceof Error ? error.message : String(error) },
        { status: 500 }
      );
    }
  }
  
