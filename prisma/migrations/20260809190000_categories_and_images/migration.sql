-- Create categories and migrate menu_items off the MenuCategory enum

CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "categories_sortOrder_idx" ON "categories"("sortOrder");

INSERT INTO "categories" ("id", "name", "description", "sortOrder", "createdAt", "updatedAt") VALUES
  ('cat_coffee_tea', 'Kahve & Çay', 'Özenle kavrulmuş, dikkatle demlenmiş.', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('cat_starters', 'Başlangıçlar', 'Zarif lezzetlerle hafif başlangıçlar.', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('cat_main_courses', 'Ana Yemekler', 'Duyuları rahatlatan doyurucu, incelikli yemekler.', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('cat_desserts', 'Tatlılar', 'Akşamınıza tatlı bir final.', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

ALTER TABLE "menu_items" ADD COLUMN "categoryId" TEXT;

UPDATE "menu_items" SET "categoryId" = CASE "category"::text
  WHEN 'coffee_tea' THEN 'cat_coffee_tea'
  WHEN 'starters' THEN 'cat_starters'
  WHEN 'main_courses' THEN 'cat_main_courses'
  WHEN 'desserts' THEN 'cat_desserts'
  ELSE 'cat_main_courses'
END;

ALTER TABLE "menu_items" ALTER COLUMN "categoryId" SET NOT NULL;

ALTER TABLE "menu_items" DROP COLUMN "category";

DROP TYPE "MenuCategory";

ALTER TABLE "menu_items" ALTER COLUMN "image" SET DATA TYPE TEXT;

ALTER TABLE "menu_items" ADD CONSTRAINT "menu_items_categoryId_fkey"
  FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

CREATE INDEX "menu_items_categoryId_idx" ON "menu_items"("categoryId");
