/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Circle, { Slice } from "components/circle";
import { useSelector, useDispatch } from "react-redux";
import { selectTurn } from "redux/slices/kingsBlessing/state";
import { updateRed } from "redux/slices/kingsBlessing/red";
import { updateBlue } from "redux/slices/kingsBlessing/blue";

const Fields = ({ team, data, presentationOrder }) => {
  const turn = useSelector(selectTurn);
  const dispatch = useDispatch();
  const circleCallback = field => access => {
    if (team === turn) {
      if (team === "red") {
        dispatch(
          updateRed({
            section: field,
            circleIndex: access[0],
            sliceIndex: access[1]
          })
        );
      } else if (team === "blue") {
        dispatch(
          updateBlue({
            section: field,
            circleIndex: access[0],
            sliceIndex: access[1]
          })
        );
      }
    }
  };

  return (
    <div css={playArea}>
      {presentationOrder.map(field => {
        return (
          <div key={field} css={playBlock}>
            {data[field].map((circleData, i) => {
              return (
                <Circle
                  key={i}
                  data={data[field]}
                  turn={turn}
                  team={team}
                  style={{ height: "90px", width: "90px" }}
                >
                  {circleData.map((value, j) => {
                    return (
                      <Slice
                        access={[i, j]}
                        key={`${i}-${j}`}
                        onClick={circleCallback(field)}
                        percent={1 / circleData.length}
                      />
                    );
                  })}
                </Circle>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

const playArea = css`
  display: flex;
  flex-direction: row;
  height: 30%;
  background-color: yellow;
`;

const playBlock = css`
  display: flex;
  flex: 1 1 auto;
  border: solid 1px black;
  width: 100%;
  flex-direction: column;
`;

export default Fields;
