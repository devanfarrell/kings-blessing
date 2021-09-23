import { FC } from "react";
import styled from "@emotion/styled";

import type { GoldDie as IGoldDie } from "./types";
import type { MachineDef, SendFunc } from "./kings-blessing.machine";
import { PlayerMachineDef, PlayerSendFunc } from "./player.machine";

interface InternalDotsProps {
  value: IGoldDie;
}

const InternalDots: FC<InternalDotsProps> = ({ value }) => {
  switch (value) {
    case 1:
      return (
        <>
          <Row />
          <Row style={{ justifyContent: "center" }}>
            <Dot />
          </Row>
          <Row />
        </>
      );
    case 2:
      return (
        <>
          <Row style={{ justifyContent: "flex-start" }}>
            <Dot />
          </Row>
          <Row />
          <Row style={{ justifyContent: "flex-end" }}>
            <Dot />
          </Row>
        </>
      );
    case 3:
      return (
        <>
          <Row style={{ justifyContent: "flex-start" }}>
            <Dot />
          </Row>
          <Row style={{ justifyContent: "center" }}>
            <Dot />
          </Row>
          <Row style={{ justifyContent: "flex-end" }}>
            <Dot />
          </Row>
        </>
      );
    case 4:
      return (
        <>
          <Row style={{ justifyContent: "space-between" }}>
            <Dot />
            <Dot />
          </Row>
          <Row />
          <Row style={{ justifyContent: "space-between" }}>
            <Dot />
            <Dot />
          </Row>
        </>
      );
    case 5:
      return (
        <>
          <Row style={{ justifyContent: "space-between" }}>
            <Dot />
            <Dot />
          </Row>
          <Row style={{ justifyContent: "center" }}>
            <Dot />
          </Row>
          <Row style={{ justifyContent: "space-between" }}>
            <Dot />
            <Dot />
          </Row>
        </>
      );
    case 6:
      return (
        <>
          <Row style={{ justifyContent: "space-between" }}>
            <Dot />
            <Dot />
          </Row>
          <Row style={{ justifyContent: "space-between" }}>
            <Dot />
            <Dot />
          </Row>
          <Row style={{ justifyContent: "space-between" }}>
            <Dot />
            <Dot />
          </Row>
        </>
      );
    default:
      return (
        <>
          <Row />
          <Row style={{ justifyContent: "center" }}>
            <Dot />
          </Row>
          <Row />
        </>
      );
  }
};

interface DieInterface {
  machine: PlayerMachineDef;
  send: PlayerSendFunc;
}

export const GoldDie: FC<DieInterface> = ({ machine, send }) => {
  const selected = machine.context.turnData.goldDieSelected;
  const value = machine.context.turnData.goldDie;
  const canReroll = machine.context.turnData.canRerollGoldDie;

  return (
    <Border canReroll={canReroll} selected={selected} onClick={() => send({ type: "TOGGLE_GOLD_DIE_SELECTION" })}>
      <Background uninitialized={value == null} className="gold">
        <OutsetGold>{value || 1}</OutsetGold>
        <Inset>{value || 1}</Inset>
      </Background>
    </Border>
  );
};

export const PurpleDie: FC<DieInterface> = ({ machine, send }) => {
  const selected = machine.context.turnData.purpleDieSelected;
  const value = machine.context.turnData.purpleDie;
  const canReroll = machine.context.turnData.canRerollPurpleDie;
  return (
    <Border canReroll={canReroll} selected={selected} onClick={() => send({ type: "TOGGLE_PURPLE_DIE_SELECTION" })}>
      <Background uninitialized={value == null} className="purple">
        <OutsetPurple>{value || 1}</OutsetPurple>
        <Inset>{value || 1}</Inset>
      </Background>
    </Border>
  );
};

const Inset = styled.div`
  font: bold 50px arial, sans-serif;
  color: rgba(255, 255, 255, 0.85);
  line-height: 0px;
`;

const OutsetPurple = styled.div`
  font: bold 50px arial, sans-serif;
  color: transparent;
  text-shadow: -1px -1px 2px hsla(262, 50%, 24%, 0.8);
  line-height: 0px;
`;

const OutsetGold = styled.div`
  font: bold 50px arial, sans-serif;
  color: transparent;
  text-shadow: -1px -1px 2px hsl(41, 50%, 34%, 0.8);
  line-height: 0px;
`;

const getBorderOpacity = (canReroll: boolean, selected: boolean) => (!canReroll ? 0 : selected ? 0.9 : 0.5);
const Border = styled.div<{ canReroll: boolean; selected: boolean }>`
  border-radius: 10px;
  border: solid 5px hsla(261, 50%, 24%, ${(p) => getBorderOpacity(p.canReroll, p.selected)});
  cursor: ${(p) => (p.canReroll ? "pointer" : "not-allowed")};
`;

const Background = styled.div<{ uninitialized: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  width: 75px;
  height: 75px;
  font-size: 24px;
  font-weight: bold;
  flex-direction: column;
  opacity: ${(p) => (p.uninitialized ? 0.6 : 1)};

  &.gold {
    background: radial-gradient(
        ellipse farthest-corner at right bottom,
        hsl(49, 99%, 61%) 0%,
        hsl(40, 98%, 59%) 8%,
        hsl(41, 60%, 39%) 30%,
        hsl(42, 49%, 36%) 40%,
        transparent 80%
      ),
      radial-gradient(
        ellipse farthest-corner at left top,
        hsl(0, 0%, 100%) 0%,
        hsl(60, 100%, 84%) 8%,
        hsl(44, 54%, 61%) 25%,
        hsl(41, 50%, 34%) 62.5%,
        hsl(42, 50%, 34%) 100%
      );
  }

  &.purple {
    background: radial-gradient(
        ellipse farthest-corner at right bottom,
        hsl(269, 99%, 61%) 0%,
        hsl(260, 98%, 59%) 8%,
        hsl(261, 60%, 39%) 30%,
        hsl(262, 49%, 36%) 40%,
        transparent 80%
      ),
      radial-gradient(
        ellipse farthest-corner at left top,
        hsl(0, 0%, 100%) 0%,
        hsl(260, 100%, 84%) 8%,
        hsl(264, 54%, 61%) 25%,
        hsl(261, 50%, 24%) 62.5%,
        hsl(262, 50%, 24%) 100%
      );
  }
`;

const Row = styled.div`
  height: 25px;
  display: flex;
  width: 100%;
`;

const Dot = styled.div`
  margin: 5px;
  width: 15px;
  height: 15px;
  border-radius: 10px;
  background-color: #939498;
  box-shadow: 0px 0px 13px #231f20 inset;
`;
