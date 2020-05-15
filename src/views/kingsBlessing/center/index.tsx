/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useSelector } from "react-redux";
import Crown from "./crownSvg";
import { selectOwnedFields } from "redux/slices/kingsBlessing/selection";
import path from '../images/stone.jpg'

export default function Center() {
  const owners = useSelector(selectOwnedFields);
  return (
    <div css={centerStyle}>
      <div css={crownSection}>
        <Crown player={owners[0]} />
      </div>
      <div css={crownSection}>
        <Crown player={owners[1]} />
      </div>
      <div css={crownSection}>
        <Crown player={owners[2]} />
      </div>
      <div css={crownSection}>
        <Crown player={owners[3]} />
      </div>
      <div css={crownSection}>
        <Crown player={owners[4]} />
      </div>
      <div css={crownSection}>
        <Crown player={owners[5]} />
      </div>
      <div css={crownSection}>
        <Crown player={owners[6]} />
      </div>
    </div>
  );
}

const centerStyle = css`
  display: flex;
  flex-direction: row;
  height: 10%;
  background-color: #e5ddee;
  background-size: 500px 500px;
  background-image: url(${path});
`;

const crownSection = css`
  box-sizing: border-box;
  display: flex;
  flex: 0 1 auto;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
