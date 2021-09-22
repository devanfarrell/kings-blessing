import { useState, FC } from "react";
import { GoldDie, PurpleDie } from "./die";
import { Button } from "../../components";
import { colors } from "./theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "@emotion/styled";

import { useMachine } from "@xstate/react";
import { SettingsMachine } from "../../machines/settings.machine";
import { Player } from "./types";
import { PlayerMachineDef, PlayerSendFunc } from "./player.machine";

export const Dice: FC<{ machine: PlayerMachineDef; send: PlayerSendFunc; player: Player }> = ({
  machine,
  send,
  player,
}) => {
  const [expanded, setExpanded] = useState(true);
  const [settingsMachine] = useMachine(SettingsMachine);
  const { context: settings } = settingsMachine;
  const haveRolled = machine.matches("takingTurn");
  const { purpleDieSelected, goldDieSelected, goldDie, purpleDie } = machine.context.turnData;
  const rerollText = purpleDieSelected && goldDieSelected ? "Reroll Dice" : "Reroll Die";
  const rollText = !haveRolled ? "Roll Dice" : rerollText;

  const onRollClick = () => send({ type: "ROLL_DICE" });

  const playerOneTurn = player === Player.P1;

  return (
    <PositionWrapper playerOne={playerOneTurn} expanded={expanded}>
      {player === Player.P1 && (
        <TabRow>
          <Tab playerOne expanded={expanded} onClick={() => setExpanded(!expanded)}>
            <FontAwesomeIcon color={colors.purple} icon={"angle-up"} size="2x" />
          </Tab>
        </TabRow>
      )}
      <OuterPlayAreaWrapper playerOne={playerOneTurn} expanded={expanded}>
        <InnerPlayAreaWrapper rotated={!playerOneTurn && settings.tabletop}>
          <div>
            <Button disabled={haveRolled && !purpleDieSelected && !goldDieSelected} onClick={onRollClick}>
              {rollText}
            </Button>
          </div>
          <DiceWrapper expanded={expanded}>
            {purpleDie < goldDie && <PurpleDie {...{ machine, send }} />}
            <GoldDie {...{ machine, send }} />
            {purpleDie >= goldDie && <PurpleDie {...{ machine, send }} />}
          </DiceWrapper>
          <div>
            <Button disabled={!haveRolled} onClick={() => send({ type: "SUBMIT" })}>
              End Turn
            </Button>
          </div>
        </InnerPlayAreaWrapper>
      </OuterPlayAreaWrapper>
      {player === Player.P2 && (
        <TabRow>
          <Tab playerOne={false} expanded={expanded} onClick={() => setExpanded(!expanded)}>
            <FontAwesomeIcon color={colors.purple} icon={"angle-up"} size="2x" />
          </Tab>
        </TabRow>
      )}
    </PositionWrapper>
  );
};

const radius = "20px";

type StyleProps = {
  playerOne: boolean;
  expanded: boolean;
};

const Tab = styled.div<StyleProps>`
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  ${(p) =>
    p.playerOne
      ? `border-top-left-radius: 50px; border-top-right-radius: 50px;`
      : `border-bottom-left-radius: 50px; border-bottom-right-radius: 50px;`}
  height: 50px;
  cursor: pointer;
  svg {
    transition: all ease-in-out 200ms;
    transform: rotate(${(p) => (p.expanded ? "0" : "180deg")});
  }
`;

const TabRow = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
`;

const PositionWrapper = styled.div<StyleProps>`
  position: fixed;
  width: 100%;
  transition: opacity ease-in-out 200ms;
  ${(p) => (p.playerOne ? "bottom: 0px;" : "top: 0px;")}
  opacity: ${(p) => (p.expanded ? "1" : "0.3")};
  &:hover {
    opacity: 1;
  }
  z-index: 1;
`;

const DiceWrapper = styled.div<{ expanded: boolean }>`
  display: flex;
  flex-direction: ${(p) => (p.expanded ? "column" : "row")};
  height: ${(p) => (p.expanded ? "200px" : "15vh")};
  width: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: height ease-in-out 200ms;
`;

const OuterPlayAreaWrapper = styled.div<StyleProps>`
  background-color: ${(p) => (p.playerOne ? colors.orange : colors.blue)};
  width: 100%;
  height: ${(p) => (p.expanded ? "300px" : "15vh")};
  transition: height ease-in-out 200ms;
  ${(p) =>
    p.playerOne
      ? `border-top-left-radius: ${radius}; border-top-right-radius: ${radius};`
      : `border-bottom-left-radius: ${radius}; border-bottom-right-radius: ${radius};`}
`;

const InnerPlayAreaWrapper = styled.div<{ rotated?: boolean }>`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
  transform: rotate(${(p) => (p.rotated ? "180deg" : "0deg")});
`;
