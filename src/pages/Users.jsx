import Heading from "../ui/Heading";
import SignForm from "../features/authentication/SignForm";

function NewUsers() {
  return (
    <>
      <Heading as="h1">Add a new memeber to the team</Heading>
      <SignForm />
    </>
  );
}

export default NewUsers;
