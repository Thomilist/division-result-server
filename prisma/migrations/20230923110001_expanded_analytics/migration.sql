/*
  Warnings:

  - Added the required column `updatedAt` to the `Analytics` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Analytics" ADD COLUMN     "metadataUpdates" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "resultUpdates" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
