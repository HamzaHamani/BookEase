import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";
import { toast } from "sonner";

export function useUpdateSetting() {
  const query = useQueryClient();

  const { mutate: updateSetting, status: updatingStatus } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: async () => {
      await query.invalidateQueries("settings");
      toast.success("Setting successfully edited");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { updatingStatus, updateSetting };
}
