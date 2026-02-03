import { db } from "@/db";
import { locations } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const allLocations = await db.select().from(locations);
    return NextResponse.json(allLocations);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch locations" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const result = await db
      .insert(locations)
      .values({
        name: data.name,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();
    return NextResponse.json(result[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create location" },
      { status: 500 },
    );
  }
}
