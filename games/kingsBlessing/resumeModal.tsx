import { FC } from "react";
import { Portal, Button } from "../../components";
import styled from "@emotion/styled";
import { MachineDef, SendFunc } from "./kings-blessing.machine";

interface Props {
  machine: MachineDef;
  send: SendFunc;
}

export const ResumeModal: FC<Props> = ({ machine, send }) => {
  const match = machine.matches("promptResume");

  if (!match) return null;

  return (
    <Portal>
      <Background>
        <Card>
          <CardBody>
            <Button
              onClick={() => {
                send({ type: "NEW_GAME" });
              }}
            >
              New Game
            </Button>
            <br />
            <Button
              onClick={() => {
                send({ type: "RESUME_GAME" });
              }}
            >
              Resume Game
            </Button>
          </CardBody>
        </Card>
      </Background>
    </Portal>
  );
};

const padding = "20px";
const borderRadius = "3px";

const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: absolute;
  left: 0;
  top: 0;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: ${borderRadius};
  min-width: 50vw;
  min-height: 30vh;
  z-index: 10;
  box-shadow: 0 1px 5px rgba(0, 3, 10, 0.1), 0 4px 5px -3px rgba(0, 3, 10, 0.24);
`;

const CardBody = styled.div`
  padding: ${padding};
  font-size: 2.4rem;
  font-family: sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  flex: 1 0 auto;
  line-height: 2em;
`;
