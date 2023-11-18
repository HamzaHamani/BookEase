import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { createCabin } from "../../services/apiCabins";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import FormRow from "../../ui/FormRow";

function CreateCabinForm() {
  const query = useQueryClient();
  const { register, handleSubmit, reset, getValues, formState } = useForm();

  const { errors } = formState;
  const { mutate, status } = useMutation({
    mutationFn: createCabin,
    onSuccess: async () => {
      await query.invalidateQueries("cabins");
      toast.success("Cabin created");
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  async function onSubmit(data) {
    mutate({ ...data, image: data.image[0] });
    // console.log(data.image[1]);
  }

  // TODO right notes in obsidian on how to create a cabin with supabase
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label={"Cabin name"} error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={status == "pending"}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label={"Maximun capacity"} error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={status == "pending"}
          {...register("maxCapacity", {
            required: "This field is required",
            min: { value: 1, message: "Capacity should be at least 1" },
          })}
        />
      </FormRow>

      <FormRow label={"Regular price"} error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={status == "pending"}
          {...register("regularPrice", {
            required: "This field is required",
            min: { value: 1, message: "Capacity should be at least 1" },
          })}
        />
      </FormRow>

      <FormRow label={"Discount"} error={errors?.discount?.message}>
        <Input
          type="number"
          disabled={status == "pending"}
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "discound should be less than actual price",
          })}
        />
      </FormRow>

      <FormRow
        label={"Description for website"}
        disabled={status == "pending"}
        error={errors?.description?.message}
      >
        <Textarea
          type="text"
          disabled={status == "pending"}
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This field is required",
            minLength: {
              value: 10,
              message: "Description should be at least 10 characters long",
            },
          })}
        />
      </FormRow>

      <FormRow label={"Cabin photo"} error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", { required: "this field is required" })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button $variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={status == "pending"}>
          {status == "pending" ? "Editing..." : "Edit Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
