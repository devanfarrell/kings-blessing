/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Circle, { Slice } from "components/circle";
import { useSelector, useDispatch } from "react-redux";
import { selectTurn } from "redux/slices/kingsBlessing/state";
import { updateRed } from "redux/slices/kingsBlessing/red";
import { updateBlue } from "redux/slices/kingsBlessing/blue";

const KingsCircles = ({ kingData, team }) => {
  const turn = useSelector(selectTurn);
  const dispatch = useDispatch();

  const circleCallback = access => {
    if (team === turn) {
      if (team === "red") {
        dispatch(
          updateRed({
            section: "king",
            circleIndex: access[0],
            sliceIndex: access[1]
          })
        );
      } else if (team === "blue") {
        dispatch(
          updateBlue({
            section: "king",
            circleIndex: access[0],
            sliceIndex: access[1]
          })
        );
      }
    }
  };
  return (
    <div css={circleWrapper}>
      <Circle
        data={kingData}
        turn={turn}
        team={team}
        style={{ height: "90px", width: "90px" }}
      >
        <Slice access={[0, 0]} onClick={circleCallback} percent={1 / 2} />
        <Slice percent={1 / 2} />
      </Circle>
      <Circle
        data={kingData}
        turn={turn}
        team={team}
        style={{ height: "90px", width: "90px" }}
      >
        <Slice access={[1, 0]} onClick={circleCallback} percent={1 / 3} />
        <Slice access={[1, 1]} onClick={circleCallback} percent={1 / 3} />
        <Slice percent={1 / 3} />
      </Circle>
      <Circle
        data={kingData}
        turn={turn}
        team={team}
        style={{ height: "90px", width: "90px" }}
      >
        <Slice percent={1 / 8} />
        <Slice percent={1 / 8} />
        <Slice percent={1 / 8} />
        <Slice onClick={circleCallback} percent={1 / 8} access={[2, 3]} />
        <Slice onClick={circleCallback} percent={1 / 8} access={[2, 4]} />
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
