import mailbox from "../../public/mailbox.svg";

function Redirect() {
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
        Check your Email to activate your Account
      </h2>

      <div style={{ width: "20%" }}>
        <img src={mailbox} alt="mailbox svg" style={{ width: "100%" }} />
      </div>
    </div>
  );
}

export default Redirect;
