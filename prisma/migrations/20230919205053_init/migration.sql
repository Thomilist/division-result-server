-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('PUBLIC', 'HIDDEN', 'PRIVATE');

-- CreateTable
CREATE TABLE "Division" (
    "competitionId" INTEGER NOT NULL,
    "divisionId" INTEGER NOT NULL,
    "name" TEXT,
    "resultsHtml" TEXT NOT NULL DEFAULT '',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Division_pkey" PRIMARY KEY ("competitionId","divisionId")
);

-- CreateTable
CREATE TABLE "Competition" (
    "id" SERIAL NOT NULL,
    "password" TEXT,
    "visibility" "Visibility" NOT NULL DEFAULT 'PRIVATE',
    "name" TEXT,
    "organiser" TEXT,
    "date" TEXT,
    "liveresultsId" INTEGER,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Competition_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Division" ADD CONSTRAINT "Division_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "Competition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
