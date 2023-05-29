/*
  Warnings:

  - You are about to drop the column `userId` on the `Adoption` table. All the data in the column will be lost.
  - The primary key for the `Person` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `dni` on the `Person` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `VarChar(10)`.

*/
-- DropForeignKey
ALTER TABLE "Adoption" DROP CONSTRAINT "Adoption_userId_fkey";

-- AlterTable
ALTER TABLE "Adoption" DROP COLUMN "userId",
ADD COLUMN     "personDni" VARCHAR(10);

-- AlterTable
ALTER TABLE "Person" DROP CONSTRAINT "Person_pkey",
ALTER COLUMN "dni" DROP DEFAULT,
ALTER COLUMN "dni" SET DATA TYPE VARCHAR(10),
ADD CONSTRAINT "Person_pkey" PRIMARY KEY ("dni");
DROP SEQUENCE "Person_dni_seq";

-- AddForeignKey
ALTER TABLE "Adoption" ADD CONSTRAINT "Adoption_personDni_fkey" FOREIGN KEY ("personDni") REFERENCES "Person"("dni") ON DELETE SET NULL ON UPDATE CASCADE;
