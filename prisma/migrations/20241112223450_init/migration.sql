/*
  Warnings:

  - You are about to drop the `Loginplataforma` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Loginplataforma";

-- CreateTable
CREATE TABLE "Login_plataforma" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Login_plataforma_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Login_plataforma_email_key" ON "Login_plataforma"("email");
