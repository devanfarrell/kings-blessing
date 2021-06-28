import { FC } from "react";
import styled from "@emotion/styled";
import lace from "./images/lace.svg";
import path from "./images/stone.jpg";
import { Crown } from "./crown";
import { kingsBlessingMachine } from "./stateMachine";
import { presentationOrder, Player } from "./stateMachineUtils";
import { useMachine } from "@xstate/react";
import { Circle } from "./circle";
import { Field } from "./field";
import { Dice } from "./dice";
import { SuccessModal } from "./successModal";

const KingsBlessing: FC = () => {
  const [machine, send] = useMachine(kingsBlessingMachine, {
    devTools: true,
  });

  return (
    <Wrapper>
      <SuccessModal {...{ machine, send }} />
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
        {presentationOrder.map((field) => (
          <Field key={`${field}-${Player.P1}`} {...{ send, field, machine }} player={Player.P1} />
        ))}
      </PlayArea>

      <Dice {...{ machine, send }} />
      <Center>
        {presentationOrder.map((field) => (
          <Crown key={field} owner={machine.context.claimedFields[field]} />
        ))}
      </Center>
      <PlayArea>
        {presentationOrder.map((field) => (
          <Field key={`${field}-${Player.P2}`} {...{ send, field, machine }} player={Player.P2} />
        ))}
      </PlayArea>

      <Edge>
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
    </Wrapper>
  );
};
export default KingsBlessing;

const Wrapper = styled.div`
  min-height: 100vh;
  height: 100%;
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
  background-color: #e5ddee;
  background-size: 700px 700px;
  background-image: url(${lace});
`;

const Edge = styled.div`
  height: 15%;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
`;

const Center = styled.div`
  display: flex;
  flex-direction: row;
  height: 10%;
  background-color: #e5ddee;
  background-size: 100px 100px;
  background-image: url(${path});
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
`;
