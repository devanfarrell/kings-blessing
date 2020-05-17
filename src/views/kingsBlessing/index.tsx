/** @jsx jsx */
import { css, jsx } from "@emotion/core";

import Center from "./center";
import Edge from "./edge";
import Fields from "./fields";
import SuccessModal from "./successModal";
import Dice from "./dice";
import { useSelector } from "react-redux";
import { selectOwnedFields } from "redux/slices/kingsBlessing/selection";
import { useMemo } from "react";

export default function KingsBlessing() {
  const owners = useSelector(selectOwnedFields);

  const [redCount, blueCount] = useMemo(() => {
    const redCount = owners.filter((owner) => owner === "red").length;
    const blueCount = owners.filter((owner) => owner === "blue").length;
    return [redCount, blueCount];
  }, [owners]);

  return (
    <div css={wrapper}>
      <SuccessModal isOpen={redCount > 3 || blueCount > 3} winner={redCount > blueCount ? "red" : "blue"} />
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
  min-height: 100vh;
  height: 100%;
`;
