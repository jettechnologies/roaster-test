export const QUERY_KEYS = {
  roster: {
    all: () => ["roster"],
    shifts: (date?: string) => [...QUERY_KEYS.roster.all(), "shifts", { date }],
    locations: () => [...QUERY_KEYS.roster.all(), "locations"],
    users: () => [...QUERY_KEYS.roster.all(), "users"],
  },
};
