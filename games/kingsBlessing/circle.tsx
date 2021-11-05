import { CSSProperties, FC } from "react";
import { colors } from "./theme";
import styled from "@emotion/styled";
import { Selection, Player, ExtendedFieldType } from "./types";
import { PlayerMachineDef, PlayerSendFunc } from "./player.machine";

const getColor = (selection: Selection, player: Player) => {
  if (selection === Selection.DISABLED) return "grey";
  if (selection === Selection.FINALIZED) return player === Player.P1 ? colors.orange : colors.blue;
  if (selection === Selection.SELECTED) return player === Player.P1 ? colors.lightOrange : colors.lightBlue;
  return "white";
};

type CircleProps = {
  field: ExtendedFieldType;
  circleIndex: number;
  player: Player;
  style?: CSSProperties;
  machine: PlayerMachineDef;
  send: PlayerSendFunc;
};
export const Circle: FC<CircleProps> = ({ style, field, player, circleIndex, send, machine, ...other }) => {
  const { context } = machine;
  const selections = context.fields[field][circleIndex];

  return (
    <svg style={style ?? {}} viewBox="-103 -103 206 206" {...other}>
      <g transform="rotate(-90)">
        {selections.map((selection, i) => (
          <Path
            key={i}
            clickable={selection === Selection.SELECTED || selection === Selection.UNSELECTED}
            backgroundColor={getColor(selection, player)}
            onClick={() => send({ type: "TOGGLE_SLICE", field, circleIndex, cellIndex: i })}
            d={calculatePath(selections.length, i)}
          />
        ))}
      </g>
    </svg>
  );
};

const coordinatesFromRadians = (radians: number) => {
  const x = Math.cos(radians) * 100;
  const y = Math.sin(radians) * 100;
  return { x: x === 0 ? 100 : x, y };
};

const coordinateString = (slicePercent: number, accumulativePercent: number) => {
  const pi = Math.PI;
  const startRad = 2 * pi * accumulativePercent;
  const endRad = 2 * pi * (slicePercent + accumulativePercent);
  const start = coordinatesFromRadians(startRad);
  const end = coordinatesFromRadians(endRad);
  return `M0,0 L${start.x},${start.y} A100,100 0 ${slicePercent >= 0.5 ? 1 : 0},1 ${end.x},${end.y} Z`;
};

const calculatePath = (sliceCount: number, index: number) => {
  const percent = 1 / sliceCount;
  return coordinateString(percent, percent * index);
};

const Path = styled.path<{ clickable: boolean; backgroundColor: string }>`
  cursor: ${(p) => (p.clickable ? "pointer" : "not-allowed")};
  fill: ${(p) => p.backgroundColor};
  transition: fill ease-in-out 200ms;
  stroke: black;
  stroke-width: 3px;
`;
