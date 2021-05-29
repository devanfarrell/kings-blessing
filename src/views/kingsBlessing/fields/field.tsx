/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useCallback } from "react";
import Circle, { Slice } from "components/circle";
import { useFieldData } from "../hooks";
import { RedOrBlue, FieldType } from "redux/slices/kingsBlessing/selection";
import FieldSelection from "./fieldSelection";

interface CowsProps {
  player: RedOrBlue;
  field?: FieldType;
}

export default function Cows({ player, field = "cows" }: CowsProps) {
  const [i, setI] = useState(0);
  const { turn, fieldData, sliceClickCallback } = useFieldData(player, field);

  const setActiveIndex = useCallback(
    (activeIndex: number) => {
      setI((activeIndex + fieldData.length) % fieldData.length);
    },
    [fieldData, setI]
  );

  return (
    <div css={playBlock}>
      {player === "red" && <FieldSelection activeIndex={i} {...{ player, field, setActiveIndex }} />}
      <div css={row}>
        <Circle data={fieldData} turn={turn} player={player}>
          {fieldData[i].map((_, j) => (
            <Slice
              access={[i, j]}
              key={`${i}-${j}`}
              onClick={sliceClickCallback(field)}
              percent={1 / fieldData[i].length}
            />
          ))}
        </Circle>
      </div>
      {player === "blue" && <FieldSelection activeIndex={i} {...{ player, field, setActiveIndex }} />}
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
  justify-content: center;
  height: 33%;
  flex: 1 1 auto;
  padding: 0 15px;
`;
