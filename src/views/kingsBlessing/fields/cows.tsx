/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Circle, { Slice } from "components/circle";
import { useFieldData } from "../hooks";

export default function({ player }: { player: "red" | "blue" }) {
  const field = "cows";
  const { turn, fieldData, sliceClickCallback } = useFieldData(player, field);

  return (
    <div css={playBlock}>
      <Circle data={fieldData} turn={turn} player={player} style={{ height: "90px", width: "90px" }}>
        {fieldData[0].map((value, j) => {
          return (
            <Slice
              access={[0, j]}
              key={`0-${j}`}
              onClick={sliceClickCallback(field)}
              percent={1 / fieldData[0].length}
            />
          );
        })}
      </Circle>
      <Circle data={fieldData} turn={turn} player={player} style={{ height: "90px", width: "90px" }}>
        {fieldData[1].map((value, j) => {
          return (
            <Slice
              access={[1, j]}
              key={`1-${j}`}
              onClick={sliceClickCallback(field)}
              percent={1 / fieldData[1].length}
            />
          );
        })}
      </Circle>
      <Circle data={fieldData} turn={turn} player={player} style={{ height: "90px", width: "90px" }}>
        {fieldData[2].map((value, j) => {
          return (
            <Slice
              access={[2, j]}
              key={`2-${j}`}
              onClick={sliceClickCallback(field)}
              percent={1 / fieldData[2].length}
            />
          );
        })}
      </Circle>
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
