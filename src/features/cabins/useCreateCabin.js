import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import { toast } from "sonner";

export function useCreateCabin() {
  const query = useQueryClient();
  const { mutate: createCabin, status } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: async () => {
      await query.invalidateQueries("cabins");
      toast.success("Cabin successfully created");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { createCabin, status };
}
