import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import "dotenv/config";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool, { schema });

async function main() {
  console.log("Seed started...");

  // Clear existing data
  await db.delete(schema.shifts);
  await db.delete(schema.locations);
  await db.delete(schema.users);

  // Seed Users based on user request and image
  const userResults = await db
    .insert(schema.users)
    .values([
      {
        id: "1",
        name: "Haico de Gast",
        email: "haico@hospital.com",
        role: "Surgeon",
        initials: "HG",
        status: "available",
        contractHours: "1158.0hrs",
        actualHours: "38.0hrs",
        leaveRange: "Jan 2 - Jan 9",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2",
        name: "Diane Lane",
        email: "diane@hospital.com",
        role: "Nurse",
        initials: "DL",
        status: "on_leave",
        contractHours: "1158.0hrs",
        actualHours: "38.0hrs",
        leaveRange: "Jan 12 - Jan 28",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "3",
        name: "Elizia De Gois",
        email: "elizia@hospital.com",
        role: "Physiotherapist",
        initials: "EG",
        status: "available",
        contractHours: "1158.0hrs",
        actualHours: "38.0hrs",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "4",
        name: "Elijah Oyin",
        email: "elijah@hospital.com",
        role: "Specialist",
        initials: "EO",
        status: "on_leave",
        contractHours: "1158.0hrs",
        actualHours: "38.0hrs",
        leaveRange: "Jan 8 - Jan 15",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "5",
        name: "Olumzy",
        email: "olumzy@hospital.com",
        role: "Senior Specialist",
        initials: "OL",
        status: "available",
        contractHours: "1158.0hrs",
        actualHours: "38.0hrs",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "6",
        name: "Tbnelly",
        email: "tbnelly@hospital.com",
        role: "Junior Specialist",
        initials: "TB",
        status: "available",
        contractHours: "1158.0hrs",
        actualHours: "38.0hrs",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
    .returning();

  console.log(`Seeded ${userResults.length} users`);

  // Seed Locations based on image
  const locationResults = await db
    .insert(schema.locations)
    .values([
      {
        id: "loc-days",
        name: "Days",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "loc-kamer1",
        name: "Behandelingenkamer1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "loc-mgmt",
        name: "Management",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "loc-biz",
        name: "Bijzonderheden-Verlof-Cursus...",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "loc-fin",
        name: "Financie",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
    .returning();

  console.log(`Seeded ${locationResults.length} locations`);

  // Seed Shifts based on image
  const shiftResults = await db
    .insert(schema.shifts)
    .values([
      // Behandelingenkamer1
      {
        userId: "1", // Haico
        locationId: "loc-kamer1",
        title: "Surgery",
        startTime: "11:00",
        endTime: "13:00",
        date: new Date("2025-09-08"),
        category: "surgery",
        color: "#FFF5EB",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: "2", // Diane
        locationId: "loc-kamer1",
        title: "Pijnspecialist",
        startTime: "11:00",
        endTime: "12:00",
        date: new Date("2025-09-08"),
        category: "pijnspecialist",
        color: "#F1FDF5",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Management
      {
        userId: "1", // Haico
        locationId: "loc-mgmt",
        title: "Pijnspecialist",
        startTime: "13:00",
        endTime: "15:00",
        date: new Date("2025-09-08"),
        category: "pijnspecialist",
        color: "#FFF5EB",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Bijzonderheden...
      {
        userId: "2", // Diane
        locationId: "loc-biz",
        title: "Pijnspecialist",
        startTime: "11:30",
        endTime: "13:30",
        date: new Date("2025-09-08"),
        category: "pijnspecialist",
        color: "#FCFBEA",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Financie
      {
        userId: "2", // Diane
        locationId: "loc-fin",
        title: "Pijnspecialist",
        startTime: "11:30",
        endTime: "13:30",
        date: new Date("2025-09-08"),
        category: "pijnspecialist",
        color: "#FCFBEA",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: "2", // Diane
        locationId: "loc-fin",
        title: "Pijnspecialist",
        startTime: "16:00",
        endTime: "17:30",
        date: new Date("2025-09-08"),
        category: "pijnspecialist",
        color: "#F1FDF5",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
    .returning();

  console.log(`Seeded ${shiftResults.length} shifts`);

  console.log("Seed finished!");
  process.exit(0);
}

main().catch((err) => {
  console.error("Seed failed!");
  console.error(err);
  process.exit(1);
});
