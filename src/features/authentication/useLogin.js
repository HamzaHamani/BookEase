import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function useLogin() {
  const navigate = useNavigate();
  const {
    mutate: login,
    status,
    fetchStatus,
  } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: () => {
      //   console.log("user", user);
      navigate("/"), { replace: true };
    },
    onError: (error) => {
      console.log("error", error);
      toast.error("Provided email or password are incorrect");
    },
  });
  return { login, status, fetchStatus };
}
