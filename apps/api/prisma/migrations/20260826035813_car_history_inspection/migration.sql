-- AlterTable
ALTER TABLE "cars" ADD COLUMN     "accidentFree" BOOLEAN,
ADD COLUMN     "inspected" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "inspectionPoints" INTEGER,
ADD COLUMN     "ownerCount" INTEGER,
ADD COLUMN     "registrationExpiry" TEXT;
