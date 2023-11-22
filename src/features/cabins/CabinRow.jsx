import { HiPencil, HiTrash } from "react-icons/hi";
import { HiSquare2Stack } from "react-icons/hi2";
import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";

import Modal from "../../ui/Modal";
import { useCreateCabin } from "./useCreateCabin";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteCabin } from "./useDeleteCabin";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.9fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

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
  const { createCabin, status: createStatus } = useCreateCabin();
  const { status, deleteCabin } = useDeleteCabin();

  const { name, maxCapacity, regularPrice, discount, image, description } =
    cabin;

  function handleDuplicate() {
    createCabin({
      name: `Copy of ${cabin.name}`,
      description,
      maxCapacity,
      regularPrice,
      discount,
      image,
    });
  }
  return (
    <>
      <Table.Row>
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <Capacity>Fits up to {maxCapacity} quests</Capacity>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount > 0 ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}

        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={cabin.id} />

              <Menus.List id={cabin.id}>
                <Menus.Button
                  icon={<HiSquare2Stack />}
                  onClick={handleDuplicate}
                >
                  Duplicate
                </Menus.Button>

                <Modal.Open opens="edit">
                  <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                </Modal.Open>

                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>

              <Modal.Window name="edit">
                <CreateCabinForm cabinToEdit={cabin} />
              </Modal.Window>

              <Modal.Window name="delete">
                <ConfirmDelete
                  resourceName="cabins"
                  disabled={status == "pending"}
                  onConfirm={() => deleteCabin(cabin)}
                />
              </Modal.Window>
            </Menus.Menu>
          </Modal>
        </div>
      </Table.Row>
      {/* {showForm && } */}
    </>
  );
}

export default CabinRow;
