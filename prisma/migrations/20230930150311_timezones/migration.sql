-- AlterTable
ALTER TABLE "Competition" ADD COLUMN     "dateTime" TIMESTAMP(3),
ADD COLUMN     "dateTimeString" TEXT,
ADD COLUMN     "timeZoneIana" TEXT;
