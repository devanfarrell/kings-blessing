/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Circle, { Slice } from "components/circle";
import { useSelector, useDispatch } from "react-redux";
import { selectTurn } from "redux/slices/kingsBlessing/state";
import { updateRed } from "redux/slices/kingsBlessing/red";
import { updateBlue } from "redux/slices/kingsBlessing/blue";

const QueensCircles = ({ queenData, team }) => {
  const turn = useSelector(selectTurn);
  const dispatch = useDispatch();

  const circleCallback = access => {
    if (team === turn) {
      if (team === "red") {
        dispatch(
          updateRed({
            section: "queen",
            circleIndex: access[0],
            sliceIndex: access[1]
          })
        );
      } else if (team === "blue") {
        dispatch(
          updateBlue({
            section: "queen",
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
        data={queenData}
        turn={turn}
        team={team}
        style={{ height: "90px", width: "90px" }}
      >
        <Slice access={[0, 0]} onClick={circleCallback} percent={1 / 6} />
        <Slice percent={1 / 6} />
        <Slice access={[0, 2]} onClick={circleCallback} percent={1 / 6} />
        <Slice percent={1 / 6} />
        <Slice access={[0, 4]} onClick={circleCallback} percent={1 / 6} />
        <Slice percent={1 / 6} />
      </Circle>
      <Circle
        data={queenData}
        turn={turn}
        team={team}
        style={{ height: "90px", width: "90px" }}
      >
        <Slice access={[1, 0]} onClick={circleCallback} percent={1 / 10} />
        <Slice access={[1, 1]} onClick={circleCallback} percent={1 / 10} />
        <Slice access={[1, 2]} onClick={circleCallback} percent={1 / 10} />
        <Slice percent={1 / 10} />
        <Slice percent={1 / 10} />
        <Slice percent={1 / 10} />
        <Slice percent={1 / 10} />
        <Slice percent={1 / 10} />
        <Slice percent={1 / 10} />
        <Slice percent={1 / 10} />
      </Circle>
      <Circle
        data={queenData}
        turn={turn}
        team={team}
        style={{ height: "90px", width: "90px" }}
      >
        <Slice percent={1 / 12} />
        <Slice access={[2, 1]} onClick={circleCallback} percent={1 / 12} />
        <Slice access={[2, 2]} onClick={circleCallback} percent={1 / 12} />
        <Slice access={[2, 3]} onClick={circleCallback} percent={1 / 12} />
        <Slice access={[2, 4]} onClick={circleCallback} percent={1 / 12} />
        <Slice access={[2, 5]} onClick={circleCallback} percent={1 / 12} />
        <Slice access={[2, 6]} onClick={circleCallback} percent={1 / 12} />
        <Slice access={[2, 7]} onClick={circleCallback} percent={1 / 12} />
        <Slice access={[2, 8]} onClick={circleCallback} percent={1 / 12} />
        <Slice access={[2, 9]} onClick={circleCallback} percent={1 / 12} />
        <Slice access={[2, 10]} onClick={circleCallback} percent={1 / 12} />
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
