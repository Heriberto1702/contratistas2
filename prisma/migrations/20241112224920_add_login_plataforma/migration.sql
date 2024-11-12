/*
  Warnings:

  - You are about to drop the `Login_plataforma` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Login_plataforma";

-- CreateTable
CREATE TABLE "LoginPlataforma" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LoginPlataforma_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LoginPlataforma_email_key" ON "LoginPlataforma"("email");
