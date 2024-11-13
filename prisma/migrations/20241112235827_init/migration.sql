/*
  Warnings:

  - You are about to drop the `LoginPlataforma` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "LoginPlataforma";

-- CreateTable
CREATE TABLE "loginPlataforma" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "loginPlataforma_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "loginPlataforma_email_key" ON "loginPlataforma"("email");
