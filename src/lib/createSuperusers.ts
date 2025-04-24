import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createSuperusers = async (): Promise<void> => {
  try {
    // Crear varios superusuarios
    await prisma.userRoles.createMany({
      data: [
        { email: "lopezoscarmanolo@gmail.com", role: "SUPERUSER" },
        { email: "halfa1702@gmail.com", role: "SUPERUSER" },
      ],
    });
    console.log("Superusuarios creados exitosamente.");
  } catch (error) {
    console.error("Error al crear superusuarios:", error);
  } finally {
    await prisma.$disconnect();
  }
};

createSuperusers();