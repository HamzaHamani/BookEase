import Heading from "../ui/Heading";
import Logo from "../ui/Logo";
import SignForm from "../features/authentication/SignForm";
import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import { useNavigate } from "react-router-dom";
const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;
function Signup() {
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();
  if (isAuthenticated) navigate("/");

  return (
    <LoginLayout>
      {" "}
      <Logo />
      <Heading as={"h4"}>Create Your Account</Heading>
      <SignForm />
    </LoginLayout>
  );
}

export default Signup;
