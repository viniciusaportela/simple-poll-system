import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

import Colors from "../../styles/colors";

const InputComponent = styled.input<{ withMargin?: number }>`
  outline: none;
  border: none;
  background-color: ${Colors.GRAY_2};
  padding: 0.7rem 0.6rem;
  border-radius: 4px;
  margin: ${({ withMargin }) => (withMargin ? withMargin : 0)}px 0px;

  &::placeholder {
    color: ${Colors.GRAY_3};
    opacity: 1;
  }
`;

interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  state: [string, Dispatch<SetStateAction<string>>];
  withMargin?: number;
  onEnter?: () => any;
}

const Input: React.FC<InputProps> = ({ state, onEnter, ...props }) => {
  const value = state[0];
  const setValue = state[1];

  const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setValue(ev.target.value);
  };

  const _handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onEnter && onEnter();
    }
  };

  return (
    <InputComponent
      value={value}
      onChange={onChange}
      onKeyPress={_handleKeyPress}
      {...props}
    />
  );
};

export default Input;
