import { FC } from "react";
import styled from "@emotion/styled";
import { Crown } from "./crown";
import { kingsBlessingMachine } from "./kings-blessing.machine";
import { fieldPresentationOrder, Player } from "./types";
import { useActor, useMachine } from "@xstate/react";
import { Circle } from "./circle";
import { Field } from "./field";
import { Dice } from "./dice";
import { SuccessModal } from "./successModal";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas, faCheckSquare, faTimes, faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { css, Global } from "@emotion/react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { SettingsMachine } from "../../machines/settings.machine";
import { SpawnedPlayerMachine } from "./player.machine";
import { ResumeModal } from "./resumeModal";

library.add(fas, faCheckSquare, faTimes, faAngleDown, faAngleUp);

const globalStyles = css`
  #__next {
    height: 100vh;
  }
`;

const PlayerOne: FC<{ actor: SpawnedPlayerMachine }> = ({ actor }) => {
  const [machine, send] = useActor(actor);
  const showDice = !machine.matches("awaitingTurn");
  return (
    <>
      {showDice && <Dice {...{ machine, send }} player={Player.P1} />}
      <Edge>
        <ThreeParts>
          <OneThird>
            <PartTitle>King's Blessing</PartTitle>
            <PartDescription>When Completed, you may re-roll the gold die</PartDescription>
          </OneThird>
          <TwoThirds>
            <RoyalCirclesWrapper>
              <Circle field="king" circleIndex={0} player={Player.P1} {...{ machine, send }} />
              <Circle field="king" circleIndex={1} player={Player.P1} {...{ machine, send }} />
              <Circle field="king" circleIndex={2} player={Player.P1} {...{ machine, send }} />
            </RoyalCirclesWrapper>
          </TwoThirds>
        </ThreeParts>
        <ThreeParts>
          <OneThird>
            <PartTitle>Queen's Blessing</PartTitle>
            <PartDescription>When Completed, you may re-roll the purple die</PartDescription>
          </OneThird>
          <TwoThirds>
            <RoyalCirclesWrapper>
              <Circle field="queen" circleIndex={0} player={Player.P1} {...{ machine, send }} />
              <Circle field="queen" circleIndex={1} player={Player.P1} {...{ machine, send }} />
              <Circle field="queen" circleIndex={2} player={Player.P1} {...{ machine, send }} />
            </RoyalCirclesWrapper>
          </TwoThirds>
        </ThreeParts>
      </Edge>
      <PlayArea>
        {fieldPresentationOrder.map((field) => (
          <Field key={field} {...{ send, field, machine }} player={Player.P1} />
        ))}
      </PlayArea>
    </>
  );
};

const PlayerTwo: FC<{ actor: SpawnedPlayerMachine; rotated: boolean }> = ({ actor, rotated }) => {
  const [machine, send] = useActor(actor);

  const showDice = !machine.matches("awaitingTurn");
  return (
    <>
      {showDice && <Dice {...{ machine, send }} player={Player.P2} />}
      <PlayArea>
        {fieldPresentationOrder.map((field) => (
          <Field key={field} {...{ send, field, machine }} player={Player.P2} />
        ))}
      </PlayArea>
      <Edge rotated={rotated}>
        <ThreeParts>
          <OneThird>
            <PartTitle>King's Blessing</PartTitle>
            <PartDescription>When Completed, you may re-roll the gold die</PartDescription>
          </OneThird>
          <TwoThirds>
            <RoyalCirclesWrapper>
              <Circle field="king" circleIndex={0} player={Player.P2} {...{ machine, send }} />
              <Circle field="king" circleIndex={1} player={Player.P2} {...{ machine, send }} />
              <Circle field="king" circleIndex={2} player={Player.P2} {...{ machine, send }} />
            </RoyalCirclesWrapper>
          </TwoThirds>
        </ThreeParts>
        <ThreeParts>
          <OneThird>
            <PartTitle>Queen's Blessing</PartTitle>
            <PartDescription>When Completed, you may re-roll the purple die</PartDescription>
          </OneThird>
          <TwoThirds>
            <RoyalCirclesWrapper>
              <Circle field="queen" circleIndex={0} player={Player.P2} {...{ machine, send }} />
              <Circle field="queen" circleIndex={1} player={Player.P2} {...{ machine, send }} />
              <Circle field="queen" circleIndex={2} player={Player.P2} {...{ machine, send }} />
            </RoyalCirclesWrapper>
          </TwoThirds>
        </ThreeParts>
      </Edge>
    </>
  );
};

const KingsBlessing: FC = () => {
  const [machine, send] = useMachine(kingsBlessingMachine, { devTools: true });
  const [settingsMachine] = useMachine(SettingsMachine);
  const { context: settings } = settingsMachine;

  if (machine.matches("playing") || machine.matches("promptResume")) {
    return (
      <>
        <Global styles={[globalStyles]} />
        <Wrapper>
          <ResumeModal {...{ machine, send }} />
          <SuccessModal {...{ machine, send }} />
          <PlayerOne actor={machine.context.P1} />
          <Center>
            {fieldPresentationOrder.map((field) => (
              <Crown key={field} owner={machine.context.claimedFields[field]} />
            ))}
          </Center>
          <PlayerTwo actor={machine.context.P2} rotated={settings.tabletop} />
        </Wrapper>
      </>
    );
  }
  return <div>Loading</div>;
};
export default KingsBlessing;

const Wrapper = styled.div`
  height: 100%;
  min-height: 100vh;
`;

const OneThird = styled.div`
  width: 100%;
`;

const TwoThirds = styled.div`
  width: 200%;
`;

const PartTitle = styled.div`
  font-size: 20px;
  padding: 10px 0 0 10px;
`;

const PartDescription = styled.div`
  font-size: 16px;
  padding: 5px 0 0 10px;
`;

const ThreeParts = styled.div`
  display: flex;
  flex-direction: row;
  width: 300%;
  flex: 1 1 auto;
  background-color: #faf8fc;
  background-size: 700px 700px;
  background-image: url(/images/lace.svg);
`;

const Edge = styled.div<{ rotated?: boolean }>`
  height: 15%;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  transform: rotate(${(p) => (p.rotated ? "180deg" : "0deg")});
`;

const Center = styled.div`
  display: flex;
  flex-direction: row;
  height: 10%;
  background-color: #e5ddee;
  background-size: 32px 32px;
  background-image: url(/images/tile.png);
`;

const RoyalCirclesWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;

  svg {
    height: 90px;
    width: 90px;
  }
`;

const PlayArea = styled.div`
  display: flex;
  flex-direction: row;
  height: 30%;
  background-color: rgb(147, 167, 84);
  background-size: 32px 32px;
  background-image: url(/images/grass.png);
`;
