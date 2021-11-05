import { FC, useState } from "react";
import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { colors } from "./theme";
import { Circle } from "./circle";
import { FieldType, Player } from "./types";
import { PlayerMachineDef, PlayerSendFunc } from "./player.machine";

type FieldProps = {
  field: FieldType;
  player: Player;
  machine: PlayerMachineDef;
  send: PlayerSendFunc;
};

export const Field: FC<FieldProps> = ({ field, player, machine, send }) => {
  const [circleIndex, setCurrentCircleIndex] = useState(0);
  const fieldData = machine.context.fields[field];

  return (
    <PlayBlock>
      {player === Player.P2 && (
        <PlayCircleWrapper>
          <Circle {...{ field, circleIndex, machine, send, player }} />
        </PlayCircleWrapper>
      )}

      <SelectionWrapper>
        <ArrowButton
          onClick={() =>
            setCurrentCircleIndex((activeIndex) => (activeIndex + fieldData.length - 1) % fieldData.length)
          }
        >
          <FontAwesomeIcon color={colors.purple} icon="angle-left" size="lg" />
        </ArrowButton>
        {fieldData.map((_selection, i) => (
          <SelectionCircle
            key={i}
            {...{ field, player, machine }}
            active={i === circleIndex}
            circleIndex={i}
            send={() => {
              setCurrentCircleIndex(i);
            }}
          />
        ))}
        <ArrowButton
          onClick={() =>
            setCurrentCircleIndex((activeIndex) => (activeIndex + fieldData.length + 1) % fieldData.length)
          }
        >
          <FontAwesomeIcon color={colors.purple} icon="angle-right" size="lg" />
        </ArrowButton>
      </SelectionWrapper>
      {player === Player.P1 && (
        <PlayCircleWrapper>
          <Circle {...{ field, circleIndex, machine, send, player }} />
        </PlayCircleWrapper>
      )}
    </PlayBlock>
  );
};

const SelectionCircle = styled(Circle, { shouldForwardProp: (prop) => prop !== "active" })<{ active: boolean }>`
  border: 1px solid ${(p) => (p.active ? colors.purple : "transparent")};
  border-radius: 100px;
  height: 15px;
  width: 15px;
  box-shadow: ${(p) => (p.active ? colors.purple : "transparent")} 0px 0px 3px 1px;
  transition: all 200ms;
`;

const PlayCircleWrapper = styled.div`
  display: flex;
  flex: 1 1 auto;
  justify-content: center;
`;

const PlayBlock = styled.div`
  display: flex;
  flex: 0 0 ${100 / 7}%;
  border: solid 1px black;
  flex-direction: column;
  justify-content: space-between;
  padding: 5px;
`;

const SelectionWrapper = styled.div`
  display: flex;
  flex: 0 0 auto;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  padding: 0 5px;
`;

const ArrowButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  background-color: white;
  border-radius: 30px;
  border: none;
`;
