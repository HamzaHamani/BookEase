import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Heading from "../ui/Heading";
import Logo from "../ui/Logo";
import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function Login() {
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();
  if (isAuthenticated) navigate("/");

  return (
    <LoginLayout>
      <Logo />
      <Heading as={"h4"}>Log in to your account</Heading>
      <LoginForm />
      <p style={{ fontSize: "1.5rem", color: "#333" }}>
        dont have an account?{" "}
        <span
          onClick={() => navigate("/signup")}
          style={{
            color: "#4B42DD",
            fontWeight: "500",
            cursor: "pointer",
          }}
        >
          Create one.
        </span>
      </p>
    </LoginLayout>
  );
}

export default Login;
