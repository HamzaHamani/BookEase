import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
  const query = useQueryClient();

  const { mutate: updateUser, status: updatingStatus } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: async () => {
      await query.invalidateQueries("user");
      toast.success("User accoutn successfully updated");
      // onCloseModal?.();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { updateUser, updatingStatus };
}
