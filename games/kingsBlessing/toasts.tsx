import { FC } from "react";
import styled from "@emotion/styled";
import { toast } from "react-hot-toast";
import { keyframes } from "@emotion/react";
import { Player } from "./stateMachineUtils";

const enter = keyframes`
    0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const leave = keyframes`
    0% {
    transform: scale(1);
    opacity: 1;
  }
  to {
    transform: scale(0.9);
    opacity: 0;
  }
`;

type ToastProps = {
  isVisible: boolean;
  player: Player;
};

const SuccessToast: FC<ToastProps> = ({ isVisible }) => {
  return (
    <Container className={isVisible ? "visible" : "invisible"}>
      <Emoji>👏</Emoji> way to go!
    </Container>
  );
};

const FailToast: FC<ToastProps> = ({ isVisible }) => {
  return (
    <Container className={isVisible ? "visible" : "invisible"}>
      <Emoji>❌</Emoji> poor luck
    </Container>
  );
};

const Emoji = styled.span`
  font-size: 3.6rem;
  padding: 2.4rem;
`;

export const fireSuccessToast = (player: Player) => {
  toast.custom(
    (t) => {
      return <SuccessToast isVisible={t.visible} player={player} />;
    },
    { duration: 4000, position: "top-right" }
  );
};

export const fireFailToast = (player: Player) => {
  toast.custom(
    (t) => {
      return <FailToast isVisible={t.visible} player={player} />;
    },
    { duration: 4000, position: "top-right" }
  );
};

const Container = styled.div`
  background-color: white;
  border-radius: 12px;
  flex: 1 1 auto;
  padding: 15px 20px;
  max-width: 28rem;
  width: 100%;
  display: flex;
  font-size: 1.8rem;
  align-items: center;

  animation: ${enter} 0.2s ease-out;
  &.invisible {
    animation: ${leave} 0.15s ease-in forwards;
  }
`;
