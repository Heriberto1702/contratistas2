-- CreateTable
CREATE TABLE "Contratistas" (
    "id_contratista_aprob" SERIAL NOT NULL,
    "RUC" TEXT NOT NULL,
    "cedula" TEXT NOT NULL,
    "xstoreID" TEXT NOT NULL,
    "nombre_registrado" TEXT NOT NULL,

    CONSTRAINT "Contratistas_pkey" PRIMARY KEY ("id_contratista_aprob")
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id_tipo_contratista" SERIAL NOT NULL,
    "tipo_cliente" TEXT NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id_tipo_contratista")
);

-- CreateTable
CREATE TABLE "Sexo" (
    "id_sexo" SERIAL NOT NULL,
    "sexo" TEXT NOT NULL,

    CONSTRAINT "sexo_pkey" PRIMARY KEY ("id_sexo")
);

-- CreateTable
CREATE TABLE "Especialidad" (
    "id_especialidad" SERIAL NOT NULL,
    "nombre_especialidad" TEXT NOT NULL,

    CONSTRAINT "Especialidad_pkey" PRIMARY KEY ("id_especialidad")
);

-- CreateTable
CREATE TABLE "Departamentos" (
    "id_dep" SERIAL NOT NULL,
    "id_departamento" INTEGER NOT NULL,
    "nombre_departamento" TEXT NOT NULL,
    "id_municipio" INTEGER NOT NULL,
    "nombre_municipio" TEXT NOT NULL,

    CONSTRAINT "Departamentos_pkey" PRIMARY KEY ("id_dep")
);
