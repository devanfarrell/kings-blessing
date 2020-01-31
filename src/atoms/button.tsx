/** @jsx jsx */
import { css, jsx } from "@emotion/core";

interface props {
  children?: string;
  onClick: Function;
  disabled?: boolean;
}

export function Button({ children, onClick, disabled = false }: props) {
  return (
    <button onClick={onClick} css={styles(disabled)}>
      {children}
    </button>
  );
}

const styles = (disabled: boolean) => css`
  font-size: 1.3rem;
  box-sizing: content-box;
  font-size: 1.5rem;
  padding: 0.7rem 1.7rem;
  border-radius: 3rem;
  background: linear-gradient(
    45deg,
    rgba(83, 52, 245, 1),
    rgba(156, 111, 255, 1)
  );
  color: #fff;
  font-weight: 600;
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.15);
  transition: 0.8s cubic-bezier(0.2, 1, 0.2, 1);
  cursor: pointer;
  border: solid 0.3rem rgba(83, 52, 245, 1);
  outline: none;
  font-family: sans-serif;
  &:hover,
  active {
    border-color: #ffffff;
    box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.25);
  }
  ${disabled
    ? `
    border-color: rgba(113, 103, 135, 0.5); 
    // background: rgba(147, 148, 152, 0.5);
    background: linear-gradient(45deg, rgba(83, 52, 245, 0.5), rgba(156, 111, 255, 0.5));
    pointer-events: none;
  `
    : ``}
`;
