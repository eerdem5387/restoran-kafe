-- AlterTable
ALTER TABLE "menu_items" ADD COLUMN "sortOrder" INTEGER NOT NULL DEFAULT 0;

-- Backfill sort order per category by createdAt
WITH ranked AS (
  SELECT
    id,
    ROW_NUMBER() OVER (PARTITION BY "categoryId" ORDER BY "createdAt" ASC, id ASC) - 1 AS rn
  FROM "menu_items"
)
UPDATE "menu_items" AS m
SET "sortOrder" = ranked.rn
FROM ranked
WHERE m.id = ranked.id;

-- CreateIndex
CREATE INDEX "menu_items_categoryId_sortOrder_idx" ON "menu_items"("categoryId", "sortOrder");
