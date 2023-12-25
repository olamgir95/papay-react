import styled from "styled-components";

export interface IMarginerProps {
  width?: string;
  height?: string;
  direction?: "horizontal" | "vertical";
  bg?: string;
}

const HorizontalMargin = styled.span<IMarginerProps>`
  display: flex;
  min-width: ${({ width }) => `${width}px`};
  min-height: ${({ height }) => `${height}px`};
  background: ${({ bg }) => `${bg}`};
`;

function Marginer(props: IMarginerProps) {
  return <HorizontalMargin {...props} />;
}

Marginer.defaultProps = {
  direction: "horizontal",
};

export default Marginer;
