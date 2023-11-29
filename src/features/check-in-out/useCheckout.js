import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateBooking } from "../../services/apiBookings";
export function useCheckout() {
  const queryClient = useQueryClient();
  const { mutate: checkOut, isLoading: isChekingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, { status: "checked-out" }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} Checked Out Successfully`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { checkOut, isChekingOut };
}
