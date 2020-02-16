/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Selection } from "redux/slices/kingsBlessing/selection";
import { accessNestedArray } from "utility";
import { colors } from "theme";

export default function Circle(props) {
  const { style, turn, team, data } = props;
  let accumulativePercent = 0;
  return (
    <svg style={style} viewBox="-103 -103 206 206">
      <g transform="rotate(-90)">
        {props.children.map((child, i) => {
          const { access, onClick = null, percent } = child.props;

          const finalizedColor = team === "red" ? colors.red : colors.blue;
          const selectedColor = team === "red" ? colors.lightRed : colors.lightBlue;
          let calculatedColor = "white";

          if (access) {
            const state = accessNestedArray(data, access);
            calculatedColor = state === Selection.selected ? selectedColor : calculatedColor;
            calculatedColor = state === Selection.finalized ? finalizedColor : calculatedColor;
          }

          const color = onClick ? calculatedColor : "grey";
          const pathString = coordinateString(percent, accumulativePercent);
          accumulativePercent += percent;

          const callback = () => (onClick ? onClick(access) : null);
          return (
            <path
              onClick={callback}
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
  return `M0,0 L${start.x},${start.y} A100,100 0 ${slicePercent >= 0.5 ? 1 : 0},1 ${end.x},${end.y} Z`;
}

const sliceStyle = clickable => css`
  cursor: ${clickable ? "pointer" : "not-allowed"};
  background-color: white;
  transition: background-color ease-in-out 2000ms;
`;
