import { signUp as signUpApi } from "../../services/apiAuth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useSignup() {
  const { mutate: signup, status } = useMutation({
    mutationFn: signUpApi,
    onSuccess: () => {
      toast.success(
        "Your account has been successfully updated! We've sent a verification email to confirm the changes."
      );
    },
  });

  return { signup, status };
}
