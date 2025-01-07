import  prisma  from "@/lib/prisma";

// Esto es para el manejo de las solicitudes GET
export async function GET(request: Request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get('userId');

  if (!userId) {
    return new Response(JSON.stringify({ error: "El ID del usuario es requerido" }), {
      status: 400,
    });
  }

  try {
    // Consultar los cursos matriculados usando Prisma
    const cursosMatriculados = await prisma.cursos_Matriculados.findMany({
      where: { id_contratista: Number(userId) },
      include: {
        Cursos: true, // Incluye detalles del curso
      },
    });

    return new Response(JSON.stringify(cursosMatriculados), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Error al obtener los cursos matriculados" }), {
      status: 500,
    });
  }
}
