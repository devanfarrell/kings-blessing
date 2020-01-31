/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useSelector } from "react-redux";
import Center from "./center";
import Edge from "./edge";
import Fields from "./fields";

import {
  selectRedKing,
  selectRedQueen,
  selectRedField,
  selectPresentationOrder
} from "redux/slices/kingsBlessing/red";
import {
  selectBlueKing,
  selectBlueQueen,
  selectBlueField
} from "redux/slices/kingsBlessing/blue";
import Dice from "./dice";

const KingsBlessing = () => {
  // red
  const redKingData = useSelector(selectRedKing);
  const redQueenData = useSelector(selectRedQueen);
  const presentationOrder = useSelector(selectPresentationOrder);
  const redField = useSelector(selectRedField);
  // blue
  const blueKingData = useSelector(selectBlueKing);
  const blueQueenData = useSelector(selectBlueQueen);
  const blueField = useSelector(selectBlueField);
  return (
    <div css={wrapper}>
      <Edge team="red" kingData={redKingData} queenData={redQueenData} />
      <Fields
        data={redField}
        presentationOrder={presentationOrder}
        team="red"
      />
      <Center />
      <Fields
        data={blueField}
        presentationOrder={presentationOrder}
        team="blue"
      />
      <Edge team="blue" kingData={blueKingData} queenData={blueQueenData} />
      <Dice />
    </div>
  );
};

const wrapper = css`
  height: 100vh;
  background-color: hotpink;
`;

export default KingsBlessing;
