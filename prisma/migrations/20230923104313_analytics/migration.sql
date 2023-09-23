/*
  Warnings:

  - You are about to drop the column `visits` on the `Competition` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Competition" DROP COLUMN "visits";

-- CreateTable
CREATE TABLE "Analytics" (
    "competitionId" INTEGER NOT NULL,
    "visits" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Analytics_pkey" PRIMARY KEY ("competitionId")
);

-- AddForeignKey
ALTER TABLE "Analytics" ADD CONSTRAINT "Analytics_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "Competition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
