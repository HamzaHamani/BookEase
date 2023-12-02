import Heading from "../ui/Heading";
import SignUpForm from "../features/authentication/SignUpForm";

function NewUsers() {
  return (
    <>
      <Heading as="h1">Add a new memeber to the team</Heading>
      <SignUpForm />
    </>
  );
}

export default NewUsers;
