import "dotenv/config";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient, type MenuCategory, type ReservationStatus } from "../src/generated/prisma";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is required to seed the database.");
}

const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

const menuSeed: Array<{
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  tags: string[];
  featured: boolean;
  available: boolean;
}> = [
  {
    name: "L'Arôme Espresso",
    description:
      "Özel ev karışımımız. Koyu kakao, kavrulmuş fındık ve siyah kiraz notaları.",
    price: 95,
    category: "coffee_tea",
    tags: [],
    featured: true,
    available: true,
  },
  {
    name: "Madagaskar Vanilyalı Latte",
    description: "Madagaskar vanilyası, buharda süt ve çift shot ev espressosu.",
    price: 145,
    category: "coffee_tea",
    tags: ["Vejetaryen"],
    featured: false,
    available: true,
  },
  {
    name: "Earl Grey Reserve",
    description: "Bergamot aromalı siyah çay; yanında ılık süt ile sunulur.",
    price: 110,
    category: "coffee_tea",
    tags: ["Vegan"],
    featured: false,
    available: true,
  },
  {
    name: "Trüflü Mantar Tartine",
    description: "Yabani mantar, çırpılmış ricotta ve kekik; ekşi mayalı ekmek üzerinde.",
    price: 320,
    category: "starters",
    tags: ["Vejetaryen"],
    featured: true,
    available: true,
  },
  {
    name: "Trüflü Mantar Risotto",
    description: "Arborio pirinci; siyah trüf, Parmesan ve taze otlarla yavaşça tamamlanır.",
    price: 520,
    category: "main_courses",
    tags: ["Vejetaryen", "Glutensiz"],
    featured: true,
    available: true,
  },
  {
    name: "Mühürlenmiş Ördek Göğsü",
    description: "Çıtır derili ördek göğsü, kiraz gastrique ve fırınlanmış kök sebzeler.",
    price: 680,
    category: "main_courses",
    tags: ["Glutensiz"],
    featured: false,
    available: true,
  },
  {
    name: "Bistro Steak Frites",
    description: "Izgara hanger steak, el kesimi patates kızartması, biberli tereyağı ve salata.",
    price: 720,
    category: "main_courses",
    tags: [],
    featured: false,
    available: true,
  },
  {
    name: "Yavaş Pişmiş Kuzu Omuz",
    description:
      "Düşük ateşte pişmiş kuzu omuz, kereviz püresi, elma-rezene salatası ve elma şarabı glaze.",
    price: 490,
    category: "main_courses",
    tags: ["Glutensiz"],
    featured: true,
    available: true,
  },
  {
    name: "Yanık Basque Cheesecake",
    description: "Karamelize kabuk, kremamsı iç; mevsim meyve kompostosu ile.",
    price: 240,
    category: "desserts",
    tags: ["Vejetaryen"],
    featured: true,
    available: true,
  },
];

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
  console.log("L'Arôme Bistro veritabanı seed ediliyor...");

  await prisma.reservation.deleteMany();
  await prisma.menuItem.deleteMany();

  await prisma.menuItem.createMany({ data: menuSeed });

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

  const menuCount = await prisma.menuItem.count();
  const reservationCount = await prisma.reservation.count();
  console.log(`${menuCount} menü ürünü ve ${reservationCount} rezervasyon eklendi.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
