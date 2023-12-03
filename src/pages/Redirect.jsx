import { useEffect } from "react";
import mailbox from "../../public/mailbox.svg";
import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
function Redirect() {
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        gap: "10rem",
        height: "100vh",
      }}
    >
      <h2 style={{ fontSize: "3.5rem" }}>
        Check your email to activate your account.
      </h2>

      <div style={{ width: "20%" }}>
        <img src={mailbox} alt="mailbox svg" style={{ width: "100%" }} />
      </div>
    </div>
  );
}

export default Redirect;
