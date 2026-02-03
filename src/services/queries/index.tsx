import { QUERY_KEYS } from "../query-keys";
import { queryOptions } from "@tanstack/react-query";
import { apiService } from "../api-service";

export const getRosterShiftsOption = (date?: string) =>
  queryOptions({
    queryKey: QUERY_KEYS.roster.shifts(date),
    queryFn: () => apiService.getRosterShifts(date),
  });

export const getRosterLocationsOption = () =>
  queryOptions({
    queryKey: QUERY_KEYS.roster.locations(),
    queryFn: () => apiService.getRosterLocations(),
  });

export const getRosterUsersOption = () =>
  queryOptions({
    queryKey: QUERY_KEYS.roster.users(),
    queryFn: () => apiService.getRosterUsers(),
  });
