import { pgTable, text, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
export const userStatusEnum = pgEnum("user_status", ["available", "on_leave"]);
export const shiftCategoryEnum = pgEnum("shift_category", [
    "surgery",
    "pijnspecialist",
    "consultation",
    "consult",
    "revalidatie",
    "other",
]);
export const users = pgTable("users", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => createId()),
    name: text("name").notNull(),
    email: text("email").unique(),
    role: text("role"),
    initials: text("initials"),
    avatar: text("avatar"),
    contractHours: text("contract_hours"),
    actualHours: text("actual_hours"),
    leaveRange: text("leave_range"),
    status: userStatusEnum("status").default("available").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
export const locations = pgTable("locations", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => createId()),
    name: text("name").unique().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
export const shifts = pgTable("shifts", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => createId()),
    userId: text("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    locationId: text("location_id")
        .notNull()
        .references(() => locations.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    startTime: text("startTime").notNull(),
    endTime: text("endTime").notNull(),
    date: timestamp("date").notNull(),
    category: shiftCategoryEnum("category").default("other").notNull(),
    color: text("color"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
export const usersRelations = relations(users, ({ many }) => ({
    shifts: many(shifts),
}));
export const locationsRelations = relations(locations, ({ many }) => ({
    shifts: many(shifts),
}));
export const shiftsRelations = relations(shifts, ({ one }) => ({
    user: one(users, {
        fields: [shifts.userId],
        references: [users.id],
    }),
    location: one(locations, {
        fields: [shifts.locationId],
        references: [locations.id],
    }),
}));
