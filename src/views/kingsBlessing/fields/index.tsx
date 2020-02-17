/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Cows from "./cows";
import Wheat from "./wheat";
import Lumber from "./lumber";
import Pigs from "./pigs";
import Fruit from "./fruit";
import Water from "./water";
import Wool from "./wool";

export default function Fields({ player }: { player: "red" | "blue" }) {
  return (
    <div css={playArea}>
      <Cows player={player} />
      <Wheat player={player} />
      <Lumber player={player} />
      <Pigs player={player} />
      <Fruit player={player} />
      <Water player={player} />
      <Wool player={player} />
    </div>
  );
}

const playArea = css`
  display: flex;
  flex-direction: row;
  height: 30%;
  background-color: rgb(147, 167, 84);
`;
