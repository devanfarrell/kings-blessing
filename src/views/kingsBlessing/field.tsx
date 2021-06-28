import { FC, useState } from "react";
import styled from "@emotion/styled";
import { FieldType, Player } from "./stateMachineUtils";
import { MachineDef, SendFunc } from "./stateMachine";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { colors } from "theme";
import { Circle } from "./circle";

type FieldProps = {
  field: FieldType;
  player: Player;
  machine: MachineDef;
  send: SendFunc;
};

export const Field: FC<FieldProps> = ({ field, player, machine, send }) => {
  const [circleIndex, setCurrentCircleIndex] = useState(0);
  const playerData = player === Player.P1 ? machine.context.p1Data : machine.context.p2Data;
  const fieldData = playerData[field];

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
`;

const PlayCircleWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

const PlayBlock = styled.div`
  display: flex;
  flex: 0 0 ${100 / 7}%;
  border: solid 1px black;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 5px 15px;
  height: 100%;
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
`;
