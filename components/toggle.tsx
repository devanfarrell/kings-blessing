import { FC } from "../types";
import ReactToggle, { ToggleProps as ReactToggleProps } from "react-toggle";
import styled from "@emotion/styled";
import { colors } from "../games/kingsBlessing/theme";

type ToggleProps = ReactToggleProps & {
  handleToggle: (state: boolean) => any;
  checked: boolean;
};

export const Toggle: FC<ToggleProps> = ({ id, handleToggle, ...props }) => {
  return (
    <>
      <StyledToggle
        {...props}
        onChange={(e) => handleToggle(e.target.checked)}
        icons={{
          checked: <Checked>on</Checked>,
          unchecked: <Checked>off</Checked>,
        }}
      />
    </>
  );
};

const Checked = styled.div`
  color: ${colors.white};
  font-size: 1.2rem;
  position: absolute;
  top: 50%;
`;

const onGreen = "rgb(0, 204, 109)";

const StyledToggle = styled(ReactToggle)`
  &.react-toggle {
    touch-action: pan-x;
    display: inline-block;
    position: relative;
    cursor: pointer;
    background-color: transparent;
    border: 0;
    padding: 0;
    user-select: none;
    margin-right: 10px;
  }

  &.toggleText {
    color: #f8f8f8;
  }

  &.toggle {
    margin-top: 10px;
    vertical-align: center;
    display: flex;
  }

  .react-toggle-screenreader-only {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  &.react-toggle--disabled {
    cursor: not-allowed;
    opacity: 0.5;
    -webkit-transition: opacity 0.25s;
    transition: opacity 0.25s;
  }

  .react-toggle-track {
    width: 50px;
    height: 24px;
    padding: 0;
    border-radius: 30px;
    background-color: rgb(140, 140, 140);
    -webkit-transition: all 0.2s ease;
    -moz-transition: all 0.2s ease;
    transition: all 0.2s ease;
  }

  .react-toggle:hover:not(.react-toggle--disabled) .react-toggle-track {
    background-color: rgb(180, 180, 180);
  }

  &.react-toggle--checked .react-toggle-track {
    background-color: ${onGreen};
  }

  &.react-toggle--checked:hover:not(.react-toggle--disabled) .react-toggle-track {
    background-color: ${onGreen};
  }

  .react-toggle-track-check {
    position: absolute;
    width: 14px;
    height: 10px;
    top: 0px;
    bottom: 0px;
    margin-top: auto;
    margin-bottom: auto;
    line-height: 0;
    left: 8px;
    opacity: 0;
    -webkit-transition: opacity 0.25s ease;
    -moz-transition: opacity 0.25s ease;
    transition: opacity 0.25s ease;
  }

  &.react-toggle--checked .react-toggle-track-check {
    opacity: 1;
    -webkit-transition: opacity 0.25s ease;
    -moz-transition: opacity 0.25s ease;
    transition: opacity 0.25s ease;
  }

  .react-toggle-track-x {
    position: absolute;
    width: 10px;
    height: 10px;
    top: 0px;
    bottom: 0px;
    margin-top: auto;
    margin-bottom: auto;
    line-height: 0;
    right: 10px;
    opacity: 1;
    -webkit-transition: opacity 0.25s ease;
    -moz-transition: opacity 0.25s ease;
    transition: opacity 0.25s ease;
  }

  .react-toggle--checked .react-toggle-track-x {
    opacity: 0;
  }

  .react-toggle-thumb {
    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1) 0ms;
    position: absolute;
    top: 1px;
    left: 1px;
    width: 22px;
    height: 22px;
    border: 1px solid #4d4d4d;
    border-radius: 50%;
    background-color: #fafafa;
    box-sizing: border-box;
    transition: all 0.25s ease;
  }

  &.react-toggle--checked .react-toggle-thumb {
    left: 27px;
    border-color: #19ab27;
  }

  &.react-toggle--focus .react-toggle-thumb {
    box-shadow: 0px 0px 2px 3px #0099e0;
  }

  &.react-toggle:active:not(.react-toggle--disabled) .react-toggle-thumb {
    box-shadow: 0px 0px 5px 5px #0099e0;
  }
`;
