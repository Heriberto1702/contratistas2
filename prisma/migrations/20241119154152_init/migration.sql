/*
  Warnings:

  - The primary key for the `Departamentos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_dep` on the `Departamentos` table. All the data in the column will be lost.
  - You are about to drop the column `id_municipio` on the `Departamentos` table. All the data in the column will be lost.
  - You are about to drop the column `nombre_municipio` on the `Departamentos` table. All the data in the column will be lost.
  - Added the required column `activo` to the `Contratistas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_tipo_club` to the `Contratistas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contratistas" ADD COLUMN     "activo" BOOLEAN NOT NULL,
ADD COLUMN     "id_tipo_club" INTEGER NOT NULL;

-- AlterTable
CREATE SEQUENCE departamentos_id_departamento_seq;
ALTER TABLE "Departamentos" DROP CONSTRAINT "Departamentos_pkey",
DROP COLUMN "id_dep",
DROP COLUMN "id_municipio",
DROP COLUMN "nombre_municipio",
ALTER COLUMN "id_departamento" SET DEFAULT nextval('departamentos_id_departamento_seq'),
ADD CONSTRAINT "Departamentos_pkey" PRIMARY KEY ("id_departamento");
ALTER SEQUENCE departamentos_id_departamento_seq OWNED BY "Departamentos"."id_departamento";

-- AlterTable
ALTER TABLE "Sexo" RENAME CONSTRAINT "sexo_pkey" TO "Sexo_pkey";

-- CreateTable
CREATE TABLE "Club" (
    "id_tipo_club" INTEGER NOT NULL,
    "tipo_club" TEXT NOT NULL,

    CONSTRAINT "Club_pkey" PRIMARY KEY ("id_tipo_club")
);

-- CreateTable
CREATE TABLE "Municipios" (
    "id_municipio" SERIAL NOT NULL,
    "nombre_municipio" TEXT NOT NULL,
    "id_departamento" INTEGER NOT NULL,

    CONSTRAINT "Municipios_pkey" PRIMARY KEY ("id_municipio")
);

-- CreateTable
CREATE TABLE "LoginPlataforma" (
    "id_contratista" SERIAL NOT NULL,
    "RUC" TEXT NOT NULL,
    "cedula" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nombres_contratista" TEXT NOT NULL,
    "apellidos_contratista" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "id_especialidad" INTEGER NOT NULL,
    "celular" TEXT NOT NULL,
    "id_tipo_contratista" INTEGER NOT NULL,
    "telefono_fijo" TEXT,
    "id_sexo" INTEGER NOT NULL,
    "fecha_nacimiento" TIMESTAMP(3) NOT NULL,
    "id_departamento" INTEGER NOT NULL,
    "id_municipio" INTEGER NOT NULL,

    CONSTRAINT "LoginPlataforma_pkey" PRIMARY KEY ("id_contratista")
);

-- CreateTable
CREATE TABLE "Cursos" (
    "id_curso" SERIAL NOT NULL,
    "nombre_curso" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fecha_hora_Inicio" TIMESTAMP(3) NOT NULL,
    "fecha_hora_Fin" TIMESTAMP(3) NOT NULL,
    "recomendaciones" TEXT NOT NULL,
    "imagen_curso" TEXT NOT NULL,
    "detalles_curso" TEXT NOT NULL,
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
CREATE TABLE "Eventos" (
    "id_evento" SERIAL NOT NULL,
    "nombre_evento" TEXT NOT NULL,
    "fecha_hora_evento" TIMESTAMP(3) NOT NULL,
    "locacion" TEXT NOT NULL,
    "cupos" INTEGER NOT NULL,
    "imagen_evento" TEXT NOT NULL,

    CONSTRAINT "Eventos_pkey" PRIMARY KEY ("id_evento")
);

-- CreateTable
CREATE TABLE "Eventos_Asistidos" (
    "id_asistencia" SERIAL NOT NULL,
    "id_evento" INTEGER NOT NULL,
    "id_contratista" INTEGER NOT NULL,

    CONSTRAINT "Eventos_Asistidos_pkey" PRIMARY KEY ("id_asistencia")
);

-- CreateTable
CREATE TABLE "Ordenes" (
    "id_ordenes" SERIAL NOT NULL,
    "id_orden" INTEGER NOT NULL,
    "nombre_producto" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "monto" DOUBLE PRECISION NOT NULL,
    "descuento" INTEGER NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Ordenes_pkey" PRIMARY KEY ("id_ordenes")
);

-- CreateTable
CREATE TABLE "RegistroAcceso" (
    "id_registro" SERIAL NOT NULL,
    "password" TEXT NOT NULL,
    "hora_fecha" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "id_contratista" INTEGER NOT NULL,

    CONSTRAINT "RegistroAcceso_pkey" PRIMARY KEY ("id_registro")
);

-- CreateIndex
CREATE UNIQUE INDEX "LoginPlataforma_email_key" ON "LoginPlataforma"("email");

-- AddForeignKey
ALTER TABLE "Contratistas" ADD CONSTRAINT "Contratistas_id_tipo_club_fkey" FOREIGN KEY ("id_tipo_club") REFERENCES "Club"("id_tipo_club") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Municipios" ADD CONSTRAINT "Municipios_id_departamento_fkey" FOREIGN KEY ("id_departamento") REFERENCES "Departamentos"("id_departamento") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoginPlataforma" ADD CONSTRAINT "LoginPlataforma_id_especialidad_fkey" FOREIGN KEY ("id_especialidad") REFERENCES "Especialidad"("id_especialidad") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoginPlataforma" ADD CONSTRAINT "LoginPlataforma_id_tipo_contratista_fkey" FOREIGN KEY ("id_tipo_contratista") REFERENCES "Cliente"("id_tipo_contratista") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoginPlataforma" ADD CONSTRAINT "LoginPlataforma_id_sexo_fkey" FOREIGN KEY ("id_sexo") REFERENCES "Sexo"("id_sexo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoginPlataforma" ADD CONSTRAINT "LoginPlataforma_id_departamento_fkey" FOREIGN KEY ("id_departamento") REFERENCES "Departamentos"("id_departamento") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoginPlataforma" ADD CONSTRAINT "LoginPlataforma_id_municipio_fkey" FOREIGN KEY ("id_municipio") REFERENCES "Municipios"("id_municipio") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cursos_Matriculados" ADD CONSTRAINT "Cursos_Matriculados_id_curso_fkey" FOREIGN KEY ("id_curso") REFERENCES "Cursos"("id_curso") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cursos_Matriculados" ADD CONSTRAINT "Cursos_Matriculados_id_contratista_fkey" FOREIGN KEY ("id_contratista") REFERENCES "LoginPlataforma"("id_contratista") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Eventos_Asistidos" ADD CONSTRAINT "Eventos_Asistidos_id_evento_fkey" FOREIGN KEY ("id_evento") REFERENCES "Eventos"("id_evento") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Eventos_Asistidos" ADD CONSTRAINT "Eventos_Asistidos_id_contratista_fkey" FOREIGN KEY ("id_contratista") REFERENCES "LoginPlataforma"("id_contratista") ON DELETE RESTRICT ON UPDATE CASCADE;
