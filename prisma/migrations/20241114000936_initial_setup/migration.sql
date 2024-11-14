/*
  Warnings:

  - The primary key for the `loginPlataforma` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `loginPlataforma` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `loginPlataforma` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `loginPlataforma` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[RUC]` on the table `loginPlataforma` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cedula]` on the table `loginPlataforma` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `RUC` to the `loginPlataforma` table without a default value. This is not possible if the table is not empty.
  - Added the required column `apellidos_contratista` to the `loginPlataforma` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cedula` to the `loginPlataforma` table without a default value. This is not possible if the table is not empty.
  - Added the required column `celular` to the `loginPlataforma` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fecha_nacimiento` to the `loginPlataforma` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_departamento` to the `loginPlataforma` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_especialidad` to the `loginPlataforma` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_municipio` to the `loginPlataforma` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_sexo` to the `loginPlataforma` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_tipo_contratista` to the `loginPlataforma` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombres_contratista` to the `loginPlataforma` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "loginPlataforma" DROP CONSTRAINT "loginPlataforma_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "id",
DROP COLUMN "name",
ADD COLUMN     "RUC" TEXT NOT NULL,
ADD COLUMN     "apellidos_contratista" TEXT NOT NULL,
ADD COLUMN     "cedula" TEXT NOT NULL,
ADD COLUMN     "celular" TEXT NOT NULL,
ADD COLUMN     "fecha_nacimiento" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "id_contratista" SERIAL NOT NULL,
ADD COLUMN     "id_departamento" INTEGER NOT NULL,
ADD COLUMN     "id_especialidad" INTEGER NOT NULL,
ADD COLUMN     "id_municipio" INTEGER NOT NULL,
ADD COLUMN     "id_sexo" INTEGER NOT NULL,
ADD COLUMN     "id_tipo_contratista" INTEGER NOT NULL,
ADD COLUMN     "nombres_contratista" TEXT NOT NULL,
ADD COLUMN     "telefono_fijo" TEXT,
ADD CONSTRAINT "loginPlataforma_pkey" PRIMARY KEY ("id_contratista");

-- CreateTable
CREATE TABLE "Contratistas" (
    "id_contratista_aprob" SERIAL NOT NULL,
    "RUC" TEXT NOT NULL,
    "cedula" TEXT NOT NULL,
    "xstoreID" TEXT,

    CONSTRAINT "Contratistas_pkey" PRIMARY KEY ("id_contratista_aprob")
);

-- CreateTable
CREATE TABLE "Departamentos" (
    "id_departamento" INTEGER NOT NULL,
    "nombre_departamento" TEXT NOT NULL,
    "id_municipio" INTEGER NOT NULL,
    "nombre_municipio" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id_tipo_contratista" INTEGER NOT NULL,
    "tipo_cliente" TEXT NOT NULL,
    "id_sexo" INTEGER NOT NULL,
    "sexo" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Especialidad" (
    "id_especialidad" SERIAL NOT NULL,
    "nombre_especialidad" TEXT NOT NULL,

    CONSTRAINT "Especialidad_pkey" PRIMARY KEY ("id_especialidad")
);

-- CreateTable
CREATE TABLE "RegistroAcceso" (
    "id_registro" SERIAL NOT NULL,
    "RUC_cedula" TEXT NOT NULL,
    "hora" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "RegistroAcceso_pkey" PRIMARY KEY ("id_registro")
);

-- CreateTable
CREATE TABLE "Ordenes" (
    "id_orden" SERIAL NOT NULL,
    "id_producto_SKU" TEXT NOT NULL,
    "nombre_producto" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Ordenes_pkey" PRIMARY KEY ("id_orden")
);

-- CreateTable
CREATE TABLE "Compras" (
    "id_compra" SERIAL NOT NULL,
    "id_contratista" INTEGER NOT NULL,
    "xstore_id" TEXT NOT NULL,
    "RUC" TEXT NOT NULL,
    "cedula" TEXT NOT NULL,
    "fecha_compra" TIMESTAMP(3) NOT NULL,
    "id_orden" INTEGER NOT NULL,
    "monto" DOUBLE PRECISION NOT NULL,
    "descuento" DOUBLE PRECISION NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Compras_pkey" PRIMARY KEY ("id_compra")
);

-- CreateTable
CREATE TABLE "Cursos" (
    "id_curso" SERIAL NOT NULL,
    "nombre_curso" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fecha_inicio" TIMESTAMP(3) NOT NULL,
    "fecha_fin" TIMESTAMP(3) NOT NULL,
    "hora_inicio" TEXT NOT NULL,
    "recomendaciones" TEXT,
    "imagen_curso" TEXT,
    "detalles_curso" TEXT,
    "tipo_curso" TEXT NOT NULL,

    CONSTRAINT "Cursos_pkey" PRIMARY KEY ("id_curso")
);

-- CreateTable
CREATE TABLE "Cursos_Matriculados" (
    "id_matriculas" SERIAL NOT NULL,
    "id_contratista" INTEGER NOT NULL,
    "id_curso" INTEGER NOT NULL,
    "avance" DOUBLE PRECISION NOT NULL,
    "estado" TEXT NOT NULL,

    CONSTRAINT "Cursos_Matriculados_pkey" PRIMARY KEY ("id_matriculas")
);

-- CreateTable
CREATE TABLE "Eventos_Asistidos" (
    "id_asistencia" SERIAL NOT NULL,
    "id_evento" INTEGER NOT NULL,
    "nombre_evento" TEXT NOT NULL,
    "id_contratista" INTEGER NOT NULL,
    "nombre_contratista" TEXT NOT NULL,
    "apellidos_contratista" TEXT NOT NULL,

    CONSTRAINT "Eventos_Asistidos_pkey" PRIMARY KEY ("id_asistencia")
);

-- CreateTable
CREATE TABLE "Eventos" (
    "id_evento" SERIAL NOT NULL,
    "nombre_evento" TEXT NOT NULL,
    "fecha_evento" TIMESTAMP(3) NOT NULL,
    "hora_evento" TEXT NOT NULL,
    "locacion" TEXT NOT NULL,
    "cupos" INTEGER NOT NULL,
    "imagen_evento" TEXT,

    CONSTRAINT "Eventos_pkey" PRIMARY KEY ("id_evento")
);

-- CreateIndex
CREATE UNIQUE INDEX "Contratistas_RUC_key" ON "Contratistas"("RUC");

-- CreateIndex
CREATE UNIQUE INDEX "Contratistas_cedula_key" ON "Contratistas"("cedula");

-- CreateIndex
CREATE UNIQUE INDEX "Departamentos_id_departamento_id_municipio_key" ON "Departamentos"("id_departamento", "id_municipio");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_id_tipo_contratista_id_sexo_key" ON "Cliente"("id_tipo_contratista", "id_sexo");

-- CreateIndex
CREATE UNIQUE INDEX "RegistroAcceso_RUC_cedula_key" ON "RegistroAcceso"("RUC_cedula");

-- CreateIndex
CREATE UNIQUE INDEX "loginPlataforma_RUC_key" ON "loginPlataforma"("RUC");

-- CreateIndex
CREATE UNIQUE INDEX "loginPlataforma_cedula_key" ON "loginPlataforma"("cedula");

-- AddForeignKey
ALTER TABLE "loginPlataforma" ADD CONSTRAINT "loginPlataforma_id_especialidad_fkey" FOREIGN KEY ("id_especialidad") REFERENCES "Especialidad"("id_especialidad") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loginPlataforma" ADD CONSTRAINT "loginPlataforma_id_departamento_id_municipio_fkey" FOREIGN KEY ("id_departamento", "id_municipio") REFERENCES "Departamentos"("id_departamento", "id_municipio") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loginPlataforma" ADD CONSTRAINT "loginPlataforma_id_tipo_contratista_id_sexo_fkey" FOREIGN KEY ("id_tipo_contratista", "id_sexo") REFERENCES "Cliente"("id_tipo_contratista", "id_sexo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loginPlataforma" ADD CONSTRAINT "loginPlataforma_id_contratista_fkey" FOREIGN KEY ("id_contratista") REFERENCES "Contratistas"("id_contratista_aprob") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Compras" ADD CONSTRAINT "Compras_id_contratista_fkey" FOREIGN KEY ("id_contratista") REFERENCES "loginPlataforma"("id_contratista") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Compras" ADD CONSTRAINT "Compras_id_orden_fkey" FOREIGN KEY ("id_orden") REFERENCES "Ordenes"("id_orden") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cursos_Matriculados" ADD CONSTRAINT "Cursos_Matriculados_id_contratista_fkey" FOREIGN KEY ("id_contratista") REFERENCES "loginPlataforma"("id_contratista") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cursos_Matriculados" ADD CONSTRAINT "Cursos_Matriculados_id_curso_fkey" FOREIGN KEY ("id_curso") REFERENCES "Cursos"("id_curso") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Eventos_Asistidos" ADD CONSTRAINT "Eventos_Asistidos_id_contratista_fkey" FOREIGN KEY ("id_contratista") REFERENCES "loginPlataforma"("id_contratista") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Eventos_Asistidos" ADD CONSTRAINT "Eventos_Asistidos_id_evento_fkey" FOREIGN KEY ("id_evento") REFERENCES "Eventos"("id_evento") ON DELETE RESTRICT ON UPDATE CASCADE;
