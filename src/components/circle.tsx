/** @jsx jsx */
import { css, jsx } from "@emotion/core";

function accessNestedArray(
  nestedArray: Array<any>,
  keyChain: Array<number>
): any {
  return keyChain.reduce((arr: any, index: number) => {
    return arr && arr.length > index ? arr[index] : null;
  }, nestedArray);
}

export default function Circle(props) {
  const { style, turn, team } = props;
  let accumulativePercent = 0;
  return (
    <svg style={style} viewBox="-103 -103 206 206">
      <g transform="rotate(-90)">
        {props.children.map((child, i) => {
          const { access, data, onClick = null, percent } = child.props;
          let calculatedColor = "white";

          // I don't remember why I wrote this...
          if (access) {
            const update = accessNestedArray(data.update, access);
            const active = accessNestedArray(data.active, access);
            calculatedColor = update ? "hotpink" : calculatedColor;
            calculatedColor = active ? "red" : calculatedColor;
          }

          const color = onClick ? calculatedColor : "grey";
          const pathString = coordinateString(percent, accumulativePercent);
          accumulativePercent += percent;
          return (
            <path
              onClick={onClick}
              css={sliceStyle(!!onClick && turn === team)}
              key={i}
              d={pathString}
              fill={color}
              strokeWidth="3px"
              stroke="black"
            />
          );
        })}
      </g>
    </svg>
  );
}

export function Slice(props) {
  // eslint-disable-next-line
  const { onClick, percent, color = "orange" } = props;
}

function coordinatesFromRadians(radians) {
  const x = Math.cos(radians) * 100;
  const y = Math.sin(radians) * 100;
  return { x: x === 0 ? 100 : x, y };
}

function coordinateString(slicePercent, accumulativePercent) {
  const pi = Math.PI;
  const startRad = 2 * pi * accumulativePercent;
  const endRad = 2 * pi * (slicePercent + accumulativePercent);
  const start = coordinatesFromRadians(startRad);
  const end = coordinatesFromRadians(endRad);
  return `M0,0 L${start.x},${start.y} A100,100 0 ${
    slicePercent >= 0.5 ? 1 : 0
  },1 ${end.x},${end.y} Z`;
}

const sliceStyle = clickable => css`
  cursor: ${clickable ? "pointer" : "not-allowed"};
`;
