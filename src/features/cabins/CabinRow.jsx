import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import { useState } from "react";
import { toast } from "sonner";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.9fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  padding: 0.3rem 0;
  width: 60%;
  aspect-ratio: 3/2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.7rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
  font-size: 1.6rem;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  font-size: 1.5rem;
  color: var(--color-green-700);
`;
const Capacity = styled.div`
  font-size: 1.7rem;
  /* color: var(--color-grey-600); */
`;

function CabinRow({ cabin }) {
  // const [deleting, setDeleting] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, status } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("Cabin has been Deleted");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  //#TODO change toast library to react hot toast
  // console.log(status);

  // console.log(status);
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
  } = cabin;
  return (
    <TableRow role="row">
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <Capacity>Fits up to {maxCapacity} quests</Capacity>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount>{formatCurrency(discount)}</Discount>
      <button disabled={status == "pending"} onClick={() => mutate(cabinId)}>
        {status == "pending" ? "Deleting..." : "Delete"}
      </button>
    </TableRow>
  );
}

export default CabinRow;
