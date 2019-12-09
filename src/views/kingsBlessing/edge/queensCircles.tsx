/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Circle, { Slice } from "components/circle";
import { useSelector } from "react-redux";
import { selectTurn } from "redux/slices/kingsBlessing/state";

const QueensCircles = ({ queenData, team }) => {
  const turn = useSelector(selectTurn);

  const logger = () => {
    if (team === turn) {
      console.debug("clickity clack pow");
    }
  };
  return (
    <div css={circleWrapper}>
      <Circle turn={turn} team={team} style={{ height: "90px", width: "90px" }}>
        <Slice onClick={logger} percent={1 / 6} color="white" />
        <Slice percent={1 / 6} />
        <Slice onClick={logger} percent={1 / 6} color="white" />
        <Slice percent={1 / 6} />
        <Slice onClick={logger} percent={1 / 6} color="white" />
        <Slice percent={1 / 6} />
      </Circle>
      <Circle turn={turn} team={team} style={{ height: "90px", width: "90px" }}>
        <Slice onClick={logger} percent={1 / 10} color="white" />
        <Slice onClick={logger} percent={1 / 10} color="white" />
        <Slice onClick={logger} percent={1 / 10} color="white" />
        <Slice percent={1 / 10} />
        <Slice percent={1 / 10} />
        <Slice percent={1 / 10} />
        <Slice percent={1 / 10} />
        <Slice percent={1 / 10} />
        <Slice percent={1 / 10} />
        <Slice percent={1 / 10} />
      </Circle>
      <Circle turn={turn} team={team} style={{ height: "90px", width: "90px" }}>
        <Slice percent={1 / 12} />
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
        <Slice percent={1 / 12} />
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
