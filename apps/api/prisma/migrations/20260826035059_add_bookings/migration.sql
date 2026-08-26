-- CreateTable
CREATE TABLE "bookings" (
    "id" TEXT NOT NULL,
    "kind" TEXT NOT NULL DEFAULT 'test-drive',
    "carSlug" TEXT NOT NULL,
    "carName" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "preferredDate" TIMESTAMP(3),
    "note" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "bookings_status_idx" ON "bookings"("status");

-- CreateIndex
CREATE INDEX "bookings_carSlug_idx" ON "bookings"("carSlug");
