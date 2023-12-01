import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLogin } from "../features/authentication/useLogin";
const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;
function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { fetchStatus } = useLogin();
  const { status, isAuthenticated } = useUser();

  useEffect(() => {
    if (!isAuthenticated && status !== "pending" && fetchStatus !== "fetching")
      navigate("/login");
  }, [isAuthenticated, status, navigate, fetchStatus]);

  if (status === "pending")
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
