import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import SpinnerMini from "../../ui/SpinnerMini";
import { useForm } from "react-hook-form";
import { useSignup } from "./useSignup";
import { useNavigate } from "react-router-dom";

function SignForm() {
  const navigate = useNavigate();
  const { signup, status } = useSignup();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit({ fullName, email, password }) {
    // login({ fullName, email, password });
    signup(
      { fullName, email, password },
      {
        onSettled: reset,
        onSuccess: () => {
          navigate("/redirect");
        },
      }
    );
  }
  // console.log(errors);
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRowVertical label="Full Name " error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          defaultValue=""
          disabled={status === "pending"}
          {...register("fullName", { required: "This field is required" })}
        />
      </FormRowVertical>

      <FormRowVertical label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={status === "pending"}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "provide a valid email address",
            },
          })}
        />
      </FormRowVertical>
      <FormRowVertical label="Password" error={errors?.password?.message}>
        <Input
          type="password"
          id="password"
          disabled={status === "pending"}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password must have at least 8 characters",
            },
          })}
        />
      </FormRowVertical>
      <FormRowVertical
        label="Repeat Password"
        error={errors?.repeatPassword?.message}
      >
        <Input
          type="password"
          id="repeatPassword"
          disabled={status === "pending"}
          {...register("repeatPassword", {
            required: "This field is required",
            validate: (value) =>
              value == getValues().password || "Passwords do not match",
          })}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={status == "pending"}>
          {status == "pending" ? <SpinnerMini /> : "Sign up"}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default SignForm;
