/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import KingsCircles from "./kingsCircles";
import QueensCircles from "./queensCircles";
import { useFieldData } from "../hooks";

export default function Edge({ player }: { player: "red" | "blue" }) {
  const { kingData, queenData } = useFieldData(player);

  return (
    <div css={edges}>
      <div css={threeParts}>
        <div css={oneThird}>
          <div css={partTitle}>King's Blessing</div>
          <div css={partDescription}>When Completed, you may re-roll the gold die</div>
        </div>
        <div css={twoThirds}>
          <KingsCircles team={player} kingData={kingData} />
        </div>
      </div>
      <div css={onePart}>
        <div css={partTitle} />
      </div>
      <div css={threeParts}>
        <div css={oneThird}>
          <div css={partTitle}>Queen's Blessing</div>
          <div css={partDescription}>When Completed, you may re-roll the purple die</div>
        </div>
        <div css={twoThirds}>
          <QueensCircles team={player} queenData={queenData} />
        </div>
      </div>
    </div>
  );
}

const oneThird = css`
  width: 100%;
`;

const twoThirds = css`
  width: 200%;
`;

const partTitle = css`
  font-size: 20px;
  padding: 10px 0 0 10px;
`;

const partDescription = css`
  font-size: 16px;
  padding: 5px 0 0 10px;
`;

const threeParts = css`
  display: flex;
  flex-direction: row;
  width: 300%;
  flex: 1 1 auto;
  background-color: #e5ddee;
  background-image: url(/images/lace.svg);
`;

const onePart = css`
  width: 10%;
  flex: 1 1 auto;
  background-color: #ffdb58;
`;

const edges = css`
  height: 15%;
  display: flex;
  flex: direction-row;
  box-sizing: border-box;
`;
