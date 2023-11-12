import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";

const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
  background-color: yellow;
`;

const StyledApp = styled.main`
  background-color: orangered;
  padding: 20px;
`;

function App() {
  return (
    <StyledApp>
      <GlobalStyles />
      <H1>The Wild Oasis</H1>
      <Button>click me</Button>
      <Input type={"number"} placeholder="Number of guests" />
      <div>asd</div>
    </StyledApp>
  );
}

export default App;
