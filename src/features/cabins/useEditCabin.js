import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import { toast } from "sonner";

function useEditCabin() {
  const query = useQueryClient();

  const { mutate: editCabin, status: editingStatus } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: async () => {
      await query.invalidateQueries("cabins");
      toast.success("Cabin successfully edited");
      // onCloseModal?.();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { editCabin, editingStatus };
}

export default useEditCabin;
