import ButtonIcon from "../../ui/ButtonIcon";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { useLogout } from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";

function Logout() {
  const { logout, status } = useLogout();
  //   console.log(status);
  return (
    <ButtonIcon
      onClick={() => {
        logout();
        // console.log("logout");
      }}
      disabled={status === "pending"}
    >
      {status !== "pending" ? <HiArrowRightOnRectangle /> : <SpinnerMini />}{" "}
    </ButtonIcon>
  );
}

export default Logout;
