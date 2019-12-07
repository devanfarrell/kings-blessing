/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import KingsCircles from "./kingsCircles";
import QueensCircles from "./queensCircles";

export default function Edge({ kingData, queenData }) {
  return (
    <div css={edges}>
      <div css={threeParts}>
        <div css={oneThird}>
          <div css={partTitle}>King's Blessing</div>
          <div css={partDescription}>
            When Completed, you may re-roll the 1, 2, 3, 4, 5, 6 die
          </div>
        </div>
        <div css={twoThirds}>
          <KingsCircles kingData={kingData} />
        </div>
      </div>
      <div css={onePart}>
        <div css={partTitle}>Pick Rocks</div>
      </div>
      <div css={threeParts}>
        <div css={oneThird}>
          <div css={partTitle}>Queen's Blessing</div>
          <div css={partDescription}>
            When Completed, you may re-roll the 1, 2, 4, 8, 10, 12 die
          </div>
        </div>
        <div css={twoThirds}>
          <QueensCircles queenData={queenData} />
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

const circleWrapper = css`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
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
  width: 100%;
  flex: 1 1 auto;
  background-color: #ffdb58;
`;

const edges = css`
  height: 15%;
  display: flex;
  flex: direction-row;
  box-sizing: border-box;
`;
