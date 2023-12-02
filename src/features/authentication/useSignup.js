import { signUp as signUpApi } from "../../services/apiAuth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useSignup() {
  const { mutate: signup, status } = useMutation({
    mutationFn: signUpApi,
    onSuccess: (user) => {
      console.log("success signup", user);
      toast.success(
        "Account created successfully! Please verify the new account from the user's email."
      );
    },
  });

  return { signup, status };
}
