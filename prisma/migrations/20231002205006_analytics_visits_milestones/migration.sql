-- CreateTable
CREATE TABLE "VisitsMilestone" (
    "competitionId" INTEGER NOT NULL,
    "visits" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "VisitsMilestone_competitionId_visits_key" ON "VisitsMilestone"("competitionId", "visits");

-- AddForeignKey
ALTER TABLE "VisitsMilestone" ADD CONSTRAINT "VisitsMilestone_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "Analytics"("competitionId") ON DELETE RESTRICT ON UPDATE CASCADE;
