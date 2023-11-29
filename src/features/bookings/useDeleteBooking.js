import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { mutate: deleteBooking, status } = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["bookings"] });
      toast.success("Booking has been Deleted");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { deleteBooking, status };
}
