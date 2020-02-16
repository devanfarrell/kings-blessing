/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Field from "./field";
import { FieldType } from "redux/slices/kingsBlessing/selection";
import Cows from "./cows";

export default function Fields({ player }: { player: "red" | "blue" }) {
  const presentationOrder: FieldType[] = ["wheat", "lumber", "pigs", "fruit", "water", "wool"];
  return (
    <div css={playArea}>
      <Cows player={player} />
      {presentationOrder.map(field => {
        return <Field field={field} player={player} />;
      })}
    </div>
  );
}

const playArea = css`
  display: flex;
  flex-direction: row;
  height: 30%;
  background-color: rgb(147, 167, 84);
`;
