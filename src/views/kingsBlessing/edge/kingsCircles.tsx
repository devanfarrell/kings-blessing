/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Circle, { Slice } from "components/circle";
import { useSelector, useDispatch } from "react-redux";
import { selectTurn } from "redux/slices/kingsBlessing/state";
import { updateRed, updateBlue, Field, RedOrBlue } from "redux/slices/kingsBlessing/selection";
import { kingsBlessingClickSound } from "audio";
import { useCallback } from "react";

interface KingsBlessingProps {
  kingData: Field;
  team: RedOrBlue;
}

export default function KingsCircles({ kingData, team }: KingsBlessingProps) {
  const turn = useSelector(selectTurn);
  const dispatch = useDispatch();

  const circleCallback = useCallback(
    (access: [number, number]) => {
      if (team === turn) {
        kingsBlessingClickSound.play();
        if (team === "red") {
          dispatch(
            updateRed({
              section: "king",
              circleIndex: access[0],
              sliceIndex: access[1],
            })
          );
        } else if (team === "blue") {
          dispatch(
            updateBlue({
              section: "king",
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
      <Circle data={kingData} turn={turn} player={team} style={{ height: "90px", width: "90px" }}>
        <Slice access={[0, 0]} onClick={circleCallback} percent={1 / 2} />
        <Slice percent={1 / 2} disabled />
      </Circle>
      <Circle data={kingData} turn={turn} player={team} style={{ height: "90px", width: "90px" }}>
        <Slice access={[1, 0]} onClick={circleCallback} percent={1 / 3} />
        <Slice access={[1, 1]} onClick={circleCallback} percent={1 / 3} />
        <Slice percent={1 / 3} disabled />
      </Circle>
      <Circle data={kingData} turn={turn} player={team} style={{ height: "90px", width: "90px" }}>
        <Slice percent={1 / 8} disabled />
        <Slice percent={1 / 8} disabled />
        <Slice percent={1 / 8} disabled />
        <Slice onClick={circleCallback} percent={1 / 8} access={[2, 3]} />
        <Slice onClick={circleCallback} percent={1 / 8} access={[2, 4]} />
        <Slice percent={1 / 8} disabled />
        <Slice percent={1 / 8} disabled />
        <Slice percent={1 / 8} disabled />
      </Circle>
    </div>
  );
}

const circleWrapper = css`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
`;
