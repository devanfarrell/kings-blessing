/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Circle, { Slice } from "../../../components/circle";

const logger = () => {
  console.debug("clickity clack");
};

function accessNestedArray(nestedArray: any, keyChain: Array<number>): any {
  return keyChain.reduce((arr: any, index: number) => {
    return arr && arr.length > index ? arr[index] : null;
  }, nestedArray);
}

const KingsCircles = ({ kingData }) => {
  console.debug(kingData);
  const value1 = accessNestedArray(kingData.active, [0, 1]);
  console.debug("doop", value1);
  return (
    <div css={circleWrapper}>
      <Circle style={{ height: "90px", width: "90px" }}>
        <Slice
          data={kingData}
          access={[0, 1]}
          onClick={logger}
          percent={1 / 2}
          color="white"
        />
        <Slice percent={1 / 2} color="grey" />
      </Circle>
      <Circle style={{ height: "90px", width: "90px" }}>
        <Slice onClick={logger} percent={1 / 3} color="white" />
        <Slice onClick={logger} percent={1 / 3} color="white" />
        <Slice percent={1 / 3} color="grey" />
      </Circle>
      <Circle style={{ height: "90px", width: "90px" }}>
        <Slice percent={1 / 8} color="grey" />
        <Slice percent={1 / 8} color="grey" />
        <Slice percent={1 / 8} color="grey" />
        <Slice onClick={logger} percent={1 / 8} color="white" />
        <Slice onClick={logger} percent={1 / 8} color="white" />
        <Slice percent={1 / 8} color="grey" />
        <Slice percent={1 / 8} color="grey" />
        <Slice percent={1 / 8} color="grey" />
      </Circle>
    </div>
  );
};

const circleWrapper = css`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
`;

export default KingsCircles;
