/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useSelector } from "react-redux";
import Center from "./center";
import Edge from "./edge";
import { turnSelector } from "../../redux/slices/kingsBlessing/state";

import {
  redKingSelector,
  redQueenSelector
} from "../../redux/slices/kingsBlessing/red";
import {
  blueKingSelector,
  blueQueenSelector
} from "../../redux/slices/kingsBlessing/blue";

const KingsBlessing = () => {
  const turn = useSelector(turnSelector);
  // red
  const redKingData = useSelector(redKingSelector);
  const redQueenData = useSelector(redQueenSelector);
  // blue
  const blueKingData = useSelector(blueKingSelector);
  const blueQueenData = useSelector(blueQueenSelector);
  return (
    <div css={wrapper}>
      <Edge kingData={redKingData} queenData={redQueenData} />
      <div css={playArea}>
        <div css={playBlock}>3 * 3/3</div>
        <div css={playBlock}>3 * 4/4</div>
        <div css={playBlock}>2 * 5/5</div>
        <div css={playBlock}>3 * 6/6</div>
        <div css={playBlock}>4 * 8/8</div>
        <div css={playBlock}>2 * 10/10</div>
        <div css={playBlock}>3 * 12/12</div>
      </div>
      <Center />
      <div css={playArea}>
        <div css={playBlock}>3 * 3/3</div>
        <div css={playBlock}>3 * 4/4</div>
        <div css={playBlock}>2 * 5/5</div>
        <div css={playBlock}>3 * 6/6</div>
        <div css={playBlock}>4 * 8/8</div>
        <div css={playBlock}>2 * 10/10</div>
        <div css={playBlock}>3 * 12/12</div>
      </div>
      <Edge kingData={blueKingData} queenData={blueQueenData} />
    </div>
  );
};

export const edges = css`
  height: 15%;
  background-color: black;
`;

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
`;

const wrapper = css`
  height: 100vh;
  background-color: hotpink;
`;

export default KingsBlessing;
