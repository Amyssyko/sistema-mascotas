/*
  Warnings:

  - Made the column `status` on table `LostPet` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "LostPet" ALTER COLUMN "status" SET NOT NULL;
