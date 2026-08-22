import "dotenv/config";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../src/generated/prisma/index.js";
import {
  CATEGORY_TRANSLATIONS,
  ITEM_TRANSLATIONS,
} from "./menu-i18n-data.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const useExportFile = !process.argv.includes("--from-db");

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("DATABASE_URL missing");
  process.exit(1);
}

const prisma = new PrismaClient({
  adapter: new PrismaNeon({ connectionString }),
});

function loadMenuData() {
  if (useExportFile) {
    const path = join(__dirname, "../data/menu-export.json");
    const data = JSON.parse(readFileSync(path, "utf8"));
    console.log(`Loaded ${data.categories.length} categories, ${data.items.length} items from menu-export.json`);
    return data;
  }

  return null;
}

async function loadFromDb() {
  const categories = await prisma.category.findMany({ orderBy: { sortOrder: "asc" } });
  const items = await prisma.menuItem.findMany({
    include: { category: true },
    orderBy: [{ category: { sortOrder: "asc" } }, { sortOrder: "asc" }],
  });
  console.log(`Loaded ${categories.length} categories, ${items.length} items from database`);
  return { categories, items };
}

async function main() {
  const exportData = loadMenuData();
  const { categories, items } = exportData ?? (await loadFromDb());

  let categoriesUpdated = 0;
  let itemsUpdated = 0;

  for (const category of categories) {
    const tr = CATEGORY_TRANSLATIONS[category.id];
    if (!tr) {
      console.warn(`No translation for category ${category.id} (${category.name})`);
      continue;
    }

    await prisma.category.update({
      where: { id: category.id },
      data: {
        nameEn: tr.nameEn,
        nameAr: tr.nameAr,
        descriptionEn: tr.descriptionEn,
        descriptionAr: tr.descriptionAr,
      },
    });
    categoriesUpdated++;
  }

  for (const item of items) {
    const tr = ITEM_TRANSLATIONS[item.id];
    if (!tr) {
      console.warn(`No translation for item ${item.id} (${item.name})`);
      continue;
    }

    await prisma.menuItem.update({
      where: { id: item.id },
      data: {
        nameEn: tr.nameEn,
        nameAr: tr.nameAr,
        tagsEn: tr.tagsEn,
        tagsAr: tr.tagsAr,
      },
    });
    itemsUpdated++;
  }

  console.log(`Updated ${categoriesUpdated} categories and ${itemsUpdated} menu items`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
