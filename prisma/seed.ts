import "dotenv/config";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient, type ReservationStatus } from "../src/generated/prisma";
import categories from "../data/categories.json";
import menu from "../data/menu.json";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is required to seed the database.");
}

const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

const reservationSeed: Array<{
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  specialRequests?: string;
  status: ReservationStatus;
  createdAt: string;
}> = [
  {
    firstName: "Ayşe",
    lastName: "Yılmaz",
    email: "ayse.yilmaz@email.com",
    phone: "+90 532 111 2233",
    date: "2026-07-28",
    time: "19:00",
    guests: 2,
    specialRequests: "Pencere kenarı tercih edilir",
    status: "confirmed",
    createdAt: "2026-07-20T10:00:00.000Z",
  },
  {
    firstName: "Mehmet",
    lastName: "Kaya",
    email: "mehmet.kaya@email.com",
    phone: "+90 555 444 5566",
    date: "2026-07-29",
    time: "20:00",
    guests: 4,
    specialRequests: "Doğum günü kutlaması",
    status: "pending",
    createdAt: "2026-07-22T14:30:00.000Z",
  },
  {
    firstName: "Elena",
    lastName: "Rossi",
    email: "elena.rossi@email.com",
    phone: "+1 555 987 6543",
    date: "2026-07-30",
    time: "18:30",
    guests: 3,
    status: "confirmed",
    createdAt: "2026-07-23T09:15:00.000Z",
  },
];

async function main() {
  console.log("Berray's veritabanı seed ediliyor...");

  await prisma.reservation.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.category.deleteMany();

  await prisma.category.createMany({
    data: categories.map((c) => ({
      id: c.id,
      name: c.name,
      description: c.description,
      sortOrder: c.sortOrder,
    })),
  });

  await prisma.menuItem.createMany({
    data: menu.map((item) => ({
      name: item.name,
      description: item.description,
      price: item.price,
      categoryId: item.categoryId,
      tags: item.tags ?? [],
      featured: item.featured ?? false,
      available: item.available ?? true,
      image: "image" in item ? (item.image as string | null) : null,
    })),
  });

  for (const reservation of reservationSeed) {
    await prisma.reservation.create({
      data: {
        firstName: reservation.firstName,
        lastName: reservation.lastName,
        email: reservation.email,
        phone: reservation.phone,
        date: new Date(`${reservation.date}T00:00:00.000Z`),
        time: reservation.time,
        guests: reservation.guests,
        specialRequests: reservation.specialRequests,
        status: reservation.status,
        createdAt: new Date(reservation.createdAt),
      },
    });
  }

  const categoryCount = await prisma.category.count();
  const menuCount = await prisma.menuItem.count();
  const reservationCount = await prisma.reservation.count();
  console.log(
    `${categoryCount} kategori, ${menuCount} menü ürünü ve ${reservationCount} rezervasyon eklendi.`
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
