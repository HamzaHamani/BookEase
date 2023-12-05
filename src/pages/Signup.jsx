import Heading from "../ui/Heading";
import Logo from "../ui/Logo";
import SignForm from "../features/authentication/SignForm";
import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
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
  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  return (
    <LoginLayout>
      {" "}
      <Logo />
      <Heading as={"h4"}>Create Your Account</Heading>
      <SignForm />
      <p style={{ fontSize: "1.5rem", color: "#333" }}>
        You have an account?{" "}
        <span
          onClick={() => navigate("/login")}
          style={{
            color: "#4B42DD",
            fontWeight: "500",
            cursor: "pointer",
          }}
        >
          Log in.
        </span>
      </p>
    </LoginLayout>
  );
}

export default Signup;
