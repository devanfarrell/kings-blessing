/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Circle, { Slice } from "../../../components/circle";

const logger = () => {
  console.debug("clickity clack");
};

const QueensCircles = ({ queenData }) => {
  return (
    <div css={circleWrapper}>
      <Circle style={{ height: "90px", width: "90px" }}>
        <Slice onClick={logger} percent={1 / 6} color="white" />
        <Slice percent={1 / 6} color="grey" />
        <Slice onClick={logger} percent={1 / 6} color="white" />
        <Slice percent={1 / 6} color="grey" />
        <Slice onClick={logger} percent={1 / 6} color="white" />
        <Slice percent={1 / 6} color="grey" />
      </Circle>
      <Circle style={{ height: "90px", width: "90px" }}>
        <Slice onClick={logger} percent={1 / 10} color="white" />
        <Slice onClick={logger} percent={1 / 10} color="white" />
        <Slice onClick={logger} percent={1 / 10} color="white" />
        <Slice percent={1 / 10} color="grey" />
        <Slice percent={1 / 10} color="grey" />
        <Slice percent={1 / 10} color="grey" />
        <Slice percent={1 / 10} color="grey" />
        <Slice percent={1 / 10} color="grey" />
        <Slice percent={1 / 10} color="grey" />
        <Slice percent={1 / 10} color="grey" />
      </Circle>
      <Circle style={{ height: "90px", width: "90px" }}>
        <Slice percent={1 / 12} color="grey" />
        <Slice onClick={logger} percent={1 / 12} color="white" />
        <Slice onClick={logger} percent={1 / 12} color="white" />
        <Slice onClick={logger} percent={1 / 12} color="white" />
        <Slice onClick={logger} percent={1 / 12} color="white" />
        <Slice onClick={logger} percent={1 / 12} color="white" />
        <Slice onClick={logger} percent={1 / 12} color="white" />
        <Slice onClick={logger} percent={1 / 12} color="white" />
        <Slice onClick={logger} percent={1 / 12} color="white" />
        <Slice onClick={logger} percent={1 / 12} color="white" />
        <Slice onClick={logger} percent={1 / 12} color="white" />
        <Slice percent={1 / 12} color="grey" />
      </Circle>
    </div>
  );
};

const circleWrapper = css`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
`;

export default QueensCircles;
