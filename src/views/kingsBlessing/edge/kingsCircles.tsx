/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Circle, { Slice } from "components/circle";
import { useSelector } from "react-redux";
import { selectTurn } from "redux/slices/kingsBlessing/state";

const KingsCircles = ({ kingData, team }) => {
  const turn = useSelector(selectTurn);

  const logger = () => {
    if (team === turn) {
      console.debug("clickity clack");
    }
  };
  return (
    <div css={circleWrapper}>
      <Circle turn={turn} team={team} style={{ height: "90px", width: "90px" }}>
        <Slice
          data={kingData}
          access={[0, 0]}
          onClick={logger}
          percent={1 / 2}
        />
        <Slice percent={1 / 2} />
      </Circle>
      <Circle turn={turn} team={team} style={{ height: "90px", width: "90px" }}>
        <Slice
          data={kingData}
          access={[1, 0]}
          onClick={logger}
          percent={1 / 3}
        />
        <Slice
          data={kingData}
          access={[1, 1]}
          onClick={logger}
          percent={1 / 3}
        />
        <Slice percent={1 / 3} />
      </Circle>
      <Circle turn={turn} team={team} style={{ height: "90px", width: "90px" }}>
        <Slice percent={1 / 8} />
        <Slice percent={1 / 8} />
        <Slice percent={1 / 8} />
        <Slice
          onClick={logger}
          percent={1 / 8}
          data={kingData}
          access={[2, 3]}
        />
        <Slice
          onClick={logger}
          percent={1 / 8}
          data={kingData}
          access={[2, 4]}
        />
        <Slice percent={1 / 8} />
        <Slice percent={1 / 8} />
        <Slice percent={1 / 8} />
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

export default KingsCircles;
