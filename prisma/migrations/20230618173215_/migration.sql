/*
  Warnings:

  - The values [Completada,Propietario] on the enum `AdoptionStatus` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[statusAdoptionPetId]` on the table `Adoption` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `type` to the `StatusAdoptionPet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AdoptionStatus_new" AS ENUM ('Recibida', 'Pendiente', 'Rechazada', 'Aprovada');
ALTER TABLE "StatusAdoptionPet" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "StatusAdoptionPet" ALTER COLUMN "status" TYPE "AdoptionStatus_new" USING ("status"::text::"AdoptionStatus_new");
ALTER TYPE "AdoptionStatus" RENAME TO "AdoptionStatus_old";
ALTER TYPE "AdoptionStatus_new" RENAME TO "AdoptionStatus";
DROP TYPE "AdoptionStatus_old";
ALTER TABLE "StatusAdoptionPet" ALTER COLUMN "status" SET DEFAULT 'Recibida';
COMMIT;

-- AlterTable
ALTER TABLE "StatusAdoptionPet" ADD COLUMN     "type" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Adoption_statusAdoptionPetId_key" ON "Adoption"("statusAdoptionPetId");
