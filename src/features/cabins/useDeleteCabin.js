import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { mutate: deleteCabin, status } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("Cabin has been Deleted");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { deleteCabin, status };
}
