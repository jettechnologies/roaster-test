import { QUERY_KEYS } from "../query-keys";
import { useMutation } from "@tanstack/react-query";
import { apiService } from "../api-service";
import type { CreateShiftRequest, UpdateShiftRequest } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { useToastContext } from "@/hook/toast";

export const useCreateRosterShift = () => {
  const queryClient = useQueryClient();
  const { openToast } = useToastContext();

  return useMutation({
    mutationFn: (data: CreateShiftRequest) =>
      apiService.createRosterShift(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.roster.all() });
      openToast("Shift created successfully", "success");
    },
    onError: (error: Error) => openToast(error.message, "error"),
  });
};

export const useUpdateRosterShift = () => {
  const queryClient = useQueryClient();
  const { openToast } = useToastContext();

  return useMutation({
    mutationFn: ({ id, params }: { id: string; params: UpdateShiftRequest }) =>
      apiService.updateRosterShift(id, params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.roster.all() });
      openToast("Shift updated successfully", "success");
    },
    onError: (error: Error) => openToast(error.message, "error"),
  });
};

export const useDeleteRosterShift = () => {
  const queryClient = useQueryClient();
  const { openToast } = useToastContext();

  return useMutation({
    mutationFn: (id: string) => apiService.deleteRosterShift(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.roster.all() });
      openToast("Shift deleted successfully", "success");
    },
    onError: (error: Error) => openToast(error.message, "error"),
  });
};
