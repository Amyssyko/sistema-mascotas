/*
  Warnings:

  - The values [recibida,pendiente,revisada,completada,rechazada,aprovada] on the enum `AdoptionStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [perdida,encontrada] on the enum `PetStatus` will be removed. If these variants are still used in the database, this will fail.
  - The `status` column on the `Adoption` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "StatusAdoption" AS ENUM ('Tramitando', 'Completa', 'Rechazado');

-- AlterEnum
BEGIN;
CREATE TYPE "AdoptionStatus_new" AS ENUM ('Recibida', 'Pendiente', 'Completada', 'Rechazada', 'Aprovada', 'Propietario');
ALTER TABLE "StatusAdoptionPet" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "StatusAdoptionPet" ALTER COLUMN "status" TYPE "AdoptionStatus_new" USING ("status"::text::"AdoptionStatus_new");
ALTER TYPE "AdoptionStatus" RENAME TO "AdoptionStatus_old";
ALTER TYPE "AdoptionStatus_new" RENAME TO "AdoptionStatus";
DROP TYPE "AdoptionStatus_old";
ALTER TABLE "StatusAdoptionPet" ALTER COLUMN "status" SET DEFAULT 'Recibida';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "PetStatus_new" AS ENUM ('Perdido', 'Encontrado');
ALTER TABLE "LostPet" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "LostPet" ALTER COLUMN "status" TYPE "PetStatus_new" USING ("status"::text::"PetStatus_new");
ALTER TYPE "PetStatus" RENAME TO "PetStatus_old";
ALTER TYPE "PetStatus_new" RENAME TO "PetStatus";
DROP TYPE "PetStatus_old";
ALTER TABLE "LostPet" ALTER COLUMN "status" SET DEFAULT 'Perdido';
COMMIT;

-- DropForeignKey
ALTER TABLE "LostPet" DROP CONSTRAINT "LostPet_petId_fkey";

-- AlterTable
ALTER TABLE "Adoption" DROP COLUMN "status",
ADD COLUMN     "status" "StatusAdoption" NOT NULL DEFAULT 'Tramitando';

-- AlterTable
ALTER TABLE "LostPet" ALTER COLUMN "petId" DROP NOT NULL,
ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'Perdido';

-- AlterTable
ALTER TABLE "StatusAdoptionPet" ALTER COLUMN "status" SET DEFAULT 'Recibida';

-- AddForeignKey
ALTER TABLE "LostPet" ADD CONSTRAINT "LostPet_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
