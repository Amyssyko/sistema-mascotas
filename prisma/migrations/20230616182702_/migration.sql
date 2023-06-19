/*
  Warnings:

  - A unique constraint covering the columns `[petId]` on the table `Adoption` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[petId]` on the table `LostPet` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Adoption_petId_key" ON "Adoption"("petId");

-- CreateIndex
CREATE UNIQUE INDEX "LostPet_petId_key" ON "LostPet"("petId");
