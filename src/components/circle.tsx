/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Fragment, CSSProperties } from "react";
import { Selection, Field, RedOrBlue } from "redux/slices/kingsBlessing/selection";
import { accessNestedArray } from "utility";
import { colors } from "theme";

interface CircleProps {
  children: JSX.Element[];
  style?: CSSProperties;
  data: Field;
  player: RedOrBlue;
  turn: RedOrBlue;
  className?: string; 
}

export default function Circle({
  style = { height: "100%", width: "100%" },
  turn,
  player,
  data,
  children,
  className
}: CircleProps) {
  let accumulativePercent = 0;
  return (
    <svg className={className} style={style} viewBox="-103 -103 206 206">
      <g transform="rotate(-90)">
        {children.map((child, i) => {
          const { access, onClick, percent, disabled = false }: SliceProps = child.props;

          const finalizedColor = player === "red" ? colors.red : colors.blue;
          const selectedColor = player === "red" ? colors.lightRed : colors.lightBlue;
          let calculatedColor = "white";

          if (access) {
            const state = accessNestedArray(data, access);
            calculatedColor = state === Selection.selected ? selectedColor : calculatedColor;
            calculatedColor = state === Selection.finalized ? finalizedColor : calculatedColor;
          }

          const color = disabled ? "grey" : calculatedColor;

          const pathString = coordinateString(percent, accumulativePercent);
          accumulativePercent += percent;

          const callback = () => {
            if (onClick && access) onClick(access);
          };
          return (
            <path
              onClick={callback}
              css={sliceStyle(!!onClick && turn === player)}
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

interface SliceProps {
  onClick?: (access: [number, number]) => void;
  percent: number;
  color?: string;
  access?: [number, number];
  disabled?: boolean;
}

export function Slice(props: SliceProps) {
  return <Fragment />;
}

function coordinatesFromRadians(radians: number) {
  const x = Math.cos(radians) * 100;
  const y = Math.sin(radians) * 100;
  return { x: x === 0 ? 100 : x, y };
}

function coordinateString(slicePercent: number, accumulativePercent: number) {
  const pi = Math.PI;
  const startRad = 2 * pi * accumulativePercent;
  const endRad = 2 * pi * (slicePercent + accumulativePercent);
  const start = coordinatesFromRadians(startRad);
  const end = coordinatesFromRadians(endRad);
  return `M0,0 L${start.x},${start.y} A100,100 0 ${slicePercent >= 0.5 ? 1 : 0},1 ${end.x},${end.y} Z`;
}

const sliceStyle = (clickable: boolean) => css`
  cursor: ${clickable ? "pointer" : "not-allowed"};
  background-color: white;
  transition: background-color ease-in-out 2000ms;
`;
