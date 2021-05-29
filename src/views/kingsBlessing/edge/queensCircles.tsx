/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Circle, { Slice } from "components/circle";
import { useSelector, useDispatch } from "react-redux";
import { selectTurn } from "redux/slices/kingsBlessing/state";
import { updateRed, updateBlue, RedOrBlue, Field } from "redux/slices/kingsBlessing/selection";
import { kingsBlessingClickSound } from "audio";
import { useCallback } from "react";

interface QueensCirclesProps {
  queenData: Field;
  team: RedOrBlue;
}

const QueensCircles = ({ queenData, team }: QueensCirclesProps) => {
  const turn = useSelector(selectTurn);
  const dispatch = useDispatch();

  const circleCallback = useCallback(
    (access: [number, number]) => {
      if (team === turn) {
        kingsBlessingClickSound.play();
        if (team === "red") {
          dispatch(
            updateRed({
              section: "queen",
              circleIndex: access[0],
              sliceIndex: access[1],
            })
          );
        } else if (team === "blue") {
          dispatch(
            updateBlue({
              section: "queen",
              circleIndex: access[0],
              sliceIndex: access[1],
            })
          );
        }
      }
    },
    [dispatch, team, turn]
  );

  return (
    <div css={circleWrapper}>
      <Circle data={queenData} turn={turn} player={team} style={{ height: "90px", width: "90px" }}>
        <Slice access={[0, 0]} onClick={circleCallback} percent={1 / 6} />
        <Slice percent={1 / 6} disabled />
        <Slice access={[0, 2]} onClick={circleCallback} percent={1 / 6} />
        <Slice percent={1 / 6} disabled />
        <Slice access={[0, 4]} onClick={circleCallback} percent={1 / 6} />
        <Slice percent={1 / 6} disabled />
      </Circle>
      <Circle data={queenData} turn={turn} player={team} style={{ height: "90px", width: "90px" }}>
        <Slice access={[1, 0]} onClick={circleCallback} percent={1 / 10} />
        <Slice access={[1, 1]} onClick={circleCallback} percent={1 / 10} />
        <Slice access={[1, 2]} onClick={circleCallback} percent={1 / 10} />
        <Slice percent={1 / 10} disabled />
        <Slice percent={1 / 10} disabled />
        <Slice percent={1 / 10} disabled />
        <Slice percent={1 / 10} disabled />
        <Slice percent={1 / 10} disabled />
        <Slice percent={1 / 10} disabled />
        <Slice percent={1 / 10} disabled />
      </Circle>
      <Circle data={queenData} turn={turn} player={team} style={{ height: "90px", width: "90px" }}>
        <Slice percent={1 / 12} disabled />
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
        <Slice percent={1 / 12} disabled />
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
