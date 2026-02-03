import { users, locations, shifts } from "@/db/schema";
import { type InferSelectModel } from "drizzle-orm";

export type User = InferSelectModel<typeof users>;
export type Location = InferSelectModel<typeof locations>;
export type Shift = InferSelectModel<typeof shifts>;

export type RoasterUser = User;

export type ShiftCategory = (typeof shifts.$inferSelect)["category"];

export const ShiftCategory = {
  SURGERY: "surgery",
  PIJNSPECIALIST: "pijnspecialist",
  CONSULTATION: "consultation",
  CONSULT: "consult",
  REVALIDATIE: "revalidatie",
  OTHER: "other",
} as const;

export interface UsersResponse {
  id: string;
  name: string;
  email: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ShiftWithDetails extends Shift {
  user: User;
  location: Location;
}

export interface CreateShiftRequest {
  userId: string;
  locationId: string;
  title: string;
  startTime: string;
  endTime: string;
  date: Date | string;
  category:
    | "surgery"
    | "pijnspecialist"
    | "consultation"
    | "consult"
    | "revalidatie"
    | "other";
  color?: string | null;
}

export type UpdateShiftRequest = Partial<CreateShiftRequest>;
