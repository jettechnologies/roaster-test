import { db } from "@/db";
import { shifts } from "@/db/schema";
import { eq, and, gte, lt } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dateStr = searchParams.get("date");

  try {
    let whereClause;
    if (dateStr) {
      const startDate = new Date(dateStr);
      const endDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000);
      whereClause = and(gte(shifts.date, startDate), lt(shifts.date, endDate));
    }

    const allShifts = await db.query.shifts.findMany({
      where: whereClause,
      with: {
        user: true,
        location: true,
      },
    });
    return NextResponse.json(allShifts);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch shifts" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const result = await db
      .insert(shifts)
      .values({
        userId: data.userId,
        locationId: data.locationId,
        title: data.title,
        startTime: data.startTime,
        endTime: data.endTime,
        date: new Date(data.date),
        category: data.category,
        color: data.color,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    // Fetch again with details to match return type ShiftWithDetails
    const newShift = await db.query.shifts.findFirst({
      where: eq(shifts.id, result[0].id),
      with: {
        user: true,
        location: true,
      },
    });

    return NextResponse.json(newShift);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create shift" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const data = await request.json();
    const { id, ...updateData } = data;

    // Handle date conversion if present
    const values: any = { ...updateData };
    if (updateData.date) {
      values.date = new Date(updateData.date);
    }
    values.updatedAt = new Date();

    await db.update(shifts).set(values).where(eq(shifts.id, id));

    const updatedShift = await db.query.shifts.findFirst({
      where: eq(shifts.id, id),
      with: {
        user: true,
        location: true,
      },
    });

    return NextResponse.json(updatedShift);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update shift" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id)
    return NextResponse.json({ error: "ID is required" }, { status: 400 });

  try {
    await db.delete(shifts).where(eq(shifts.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete shift" },
      { status: 500 },
    );
  }
}
