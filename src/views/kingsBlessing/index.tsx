/** @jsx jsx */
import { css, jsx } from "@emotion/core";

import Center from "./center";
import Edge from "./edge";
import Fields from "./fields";

import Dice from "./dice";

export default function KingsBlessing() {
  return (
    <div css={wrapper}>
      <Edge player="red" />
      <Fields player="red" />
      <Center />
      <Fields player="blue" />
      <Edge player="blue" />
      <Dice />
    </div>
  );
}

const wrapper = css`
  height: 100vh;
  background-color: hotpink;
`;
