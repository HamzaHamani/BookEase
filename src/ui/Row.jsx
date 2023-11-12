import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;

  ${(props) =>
    props.type === "horizontal" &&
    css`
      /* background-color: red; */
      align-items: center;
      justify-content: space-between;
    `}
  ${(props) =>
    props.type === "vertical" &&
    css`
      /* flex-direction: row; */
      flex-direction: column;
      gap: 1.6rem;
    `}
`;

Row.defaultProps = { type: "vetical" };

export default Row;
