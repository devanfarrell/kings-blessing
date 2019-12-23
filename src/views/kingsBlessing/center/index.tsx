/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { ReactComponent as Crown } from "./crown.svg";
import { useDispatch } from "react-redux";
import { switchPlayers, rollDice } from "redux/slices/kingsBlessing/state";
import { submitRedAnswer } from "redux/slices/kingsBlessing/red";

const Center = () => {
  const dispatch = useDispatch();

  return (
    <div css={centerStyle}>
      <div onClick={() => dispatch(switchPlayers())} css={crownSection}>
        <Crown css={crownStyle} />
      </div>
      <div onClick={() => dispatch(rollDice())} css={crownSection}>
        <Crown css={crownStyle} />
      </div>
      <div onClick={() => dispatch(submitRedAnswer())} css={crownSection}>
        <Crown css={crownStyle} />
      </div>
      <div css={crownSection}>
        <Crown css={crownStyle} />
      </div>
      <div css={crownSection}>
        <Crown css={crownStyle} />
      </div>
      <div css={crownSection}>
        <Crown css={crownStyle} />
      </div>
      <div css={crownSection}>
        <Crown css={crownStyle} />
      </div>
    </div>
  );
};

const crownStyle = css`
  width: 40%;
`;

const centerStyle = css`
  display: flex;
  flex-direction: row;
  height: 10%;
  background-color: #e5ddee;
  background-image: url(/images/lace.svg);
`;

const crownSection = css`
  box-sizing: border-box;
  display: flex;
  flex: 0 1 auto;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export default Center;
