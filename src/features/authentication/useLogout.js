import { logoutApi } from "../../services/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: logout, status } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      console.log("clicked");
      queryClient.removeQueries(); // remove all queries , so no info about user get stored in React query
      navigate("/login"), { replace: true };
    },
    onError: (error) => {
      console.log("error", error);
      toast.error("Something went wrong");
    },
  });

  return { logout, status };
}
