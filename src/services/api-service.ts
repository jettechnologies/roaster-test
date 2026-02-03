import type {
  Shift,
  Location,
  ShiftWithDetails,
  CreateShiftRequest,
  UpdateShiftRequest,
  RoasterUser,
} from "@/types";

export interface PaginationMeta {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta;
}

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => null);
      throw new Error(
        errData?.error || `HTTP ${response.status}: ${response.statusText}`,
      );
    }

    return response.json();
  }

  // ✅ ROSTER METHODS
  async getRosterShifts(date?: string): Promise<ShiftWithDetails[]> {
    const query = date ? `?date=${date}` : "";
    return this.request(`/roster/shifts${query}`);
  }

  async createRosterShift(data: CreateShiftRequest): Promise<ShiftWithDetails> {
    return this.request(`/roster/shifts`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateRosterShift(
    id: string,
    data: UpdateShiftRequest,
  ): Promise<ShiftWithDetails> {
    return this.request(`/roster/shifts`, {
      method: "PATCH",
      body: JSON.stringify({ id, ...data }),
    });
  }

  async deleteRosterShift(id: string): Promise<void> {
    await this.request(`/roster/shifts?id=${id}`, {
      method: "DELETE",
    });
  }

  async getRosterLocations(): Promise<Location[]> {
    return this.request(`/roster/locations`);
  }

  async getRosterUsers(): Promise<RoasterUser[]> {
    return this.request(`/roster/users`);
  }
}

export const apiService = new ApiService();
