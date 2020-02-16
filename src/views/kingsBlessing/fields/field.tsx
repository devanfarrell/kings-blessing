/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { FieldType } from "redux/slices/kingsBlessing/selection";
import Circle, { Slice } from "components/circle";
import { useFieldData } from "../hooks";

export default function Field({ player, field }: { player: "red" | "blue"; field: FieldType }) {
  const { turn, fieldData, sliceClickCallback } = useFieldData(player, field);

  return (
    <div css={playBlock}>
      {fieldData.map((circleData, i) => {
        return (
          <Circle key={i} data={fieldData} turn={turn} team={player} style={{ height: "90px", width: "90px" }}>
            {circleData.map((value, j) => {
              return (
                <Slice
                  access={[i, j]}
                  key={`${i}-${j}`}
                  onClick={sliceClickCallback(field)}
                  percent={1 / circleData.length}
                />
              );
            })}
          </Circle>
        );
      })}
    </div>
  );
}

const playBlock = css`
  display: flex;
  flex: 1 1 auto;
  border: solid 1px black;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  padding: 5px 0;
`;
