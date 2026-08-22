import "dotenv/config";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../src/generated/prisma/index.js";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("DATABASE_URL missing");
  process.exit(1);
}

const prisma = new PrismaClient({
  adapter: new PrismaNeon({ connectionString }),
});

const categories = await prisma.category.findMany({ orderBy: { sortOrder: "asc" } });
const items = await prisma.menuItem.findMany({
  include: { category: true },
  orderBy: [{ category: { sortOrder: "asc" } }, { sortOrder: "asc" }],
});

console.log(JSON.stringify({ categories, items }, null, 2));
await prisma.$disconnect();
