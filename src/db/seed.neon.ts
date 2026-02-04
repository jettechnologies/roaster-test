// src/seed.ts
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";
import { config } from "dotenv";

config({ path: ".env.local" });

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL is not defined in .env.local");
}

const sql = neon(databaseUrl);
const db = drizzle({ client: sql });

async function seedUsers() {
  const users = await db.select().from(schema.users);
  if (users.length === 0) {
    await db.insert(schema.users).values([
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
    ]);
    console.log("Seeded users");
  } else {
    console.log("Users already exist. Skipping user seed.");
  }
}

async function seedLocations() {
  const locations = await db.select().from(schema.locations);
  if (locations.length === 0) {
    await db.insert(schema.locations).values([
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
    ]);
    console.log("Seeded locations");
  } else {
    console.log("Locations already exist. Skipping location seed.");
  }
}

async function seedShifts() {
  const shifts = await db.select().from(schema.shifts);
  if (shifts.length === 0) {
    await db.insert(schema.shifts).values([
      {
        userId: "1",
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
        userId: "2",
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
      {
        userId: "1",
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
      {
        userId: "2",
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
      {
        userId: "2",
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
        userId: "2",
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
    ]);
    console.log("Seeded shifts");
  } else {
    console.log("Shifts already exist. Skipping shift seed.");
  }
}

async function main() {
  try {
    await seedUsers();
    await seedLocations();
    await seedShifts();
    console.log("All seeding completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

main();
