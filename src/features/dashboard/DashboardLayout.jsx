import styled from "styled-components";
import { useRecentBooking } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import { useCabins } from "../cabins/useCabin";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { pending, bookings } = useRecentBooking();
  const { confirmedStays, pending: pendingStays, numDays } = useRecentStays();

  const { cabins, status: pending3 } = useCabins();

  if (pending || pendingStays || pending3 == "pending") return <Spinner />;
  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      {/* <TodayActivity /> */}
      <SalesChart booking={bookings} numDays={numDays} />
      <DurationChart confirmedStays={confirmedStays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
