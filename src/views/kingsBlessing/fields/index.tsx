/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Field from "./field";
import { RedOrBlue, presentationOrder } from "redux/slices/kingsBlessing/selection";

interface FieldsProps {
  player: RedOrBlue;
}

export default function Fields({ player }: FieldsProps) {
  return (
    <div css={playArea}>
      {presentationOrder.map((field) => (
        <Field key={field} {...{ player, field }} />
      ))}
    </div>
  );
}

const playArea = css`
  display: flex;
  flex-direction: row;
  height: 30%;
  background-color: rgb(147, 167, 84);
`;
