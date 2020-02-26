/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Circle, { Slice } from "components/circle";
import { useFieldData } from "../hooks";

export default function Fruit({ player }: { player: "red" | "blue" }) {
  const field = "fruit";
  const { turn, fieldData, sliceClickCallback } = useFieldData(player, field);

  return (
    <div css={playBlock}>
      <div css={row}>
        <Circle data={fieldData} turn={turn} player={player}>
          {fieldData[0].map((_, j) => {
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
        <div css={stupidExtraDiv} />
      </div>
      <div css={row}>
        <div css={stupidExtraDiv} />
        <Circle data={fieldData} turn={turn} player={player}>
          {fieldData[1].map((_, j) => {
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
      </div>
      <div css={row}>
        <Circle data={fieldData} turn={turn} player={player}>
          {fieldData[2].map((_, j) => {
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
        <div css={stupidExtraDiv} />
      </div>
      <div css={row}>
        <div css={stupidExtraDiv} />
        <Circle data={fieldData} turn={turn} player={player}>
          {fieldData[3].map((_, j) => {
            return (
              <Slice
                access={[2, j]}
                key={`2-${j}`}
                onClick={sliceClickCallback(field)}
                percent={1 / fieldData[3].length}
              />
            );
          })}
        </Circle>
      </div>
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

const row = css`
  display: flex;
  justify-content: space-evenly;
  height: 25%;
  flex: 1 1 auto;
`;

const stupidExtraDiv = css`
  display: flex;
  flex: 1 1 auto;
  width: 50%;
  @media (max-width: 750px) {
    width: 0;
  }
`;
