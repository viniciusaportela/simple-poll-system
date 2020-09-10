import React from "react";
import styled from "styled-components";

import Colors from "../../styles/colors";
import CheckImage from "../../assets/images/check.png";

const RadioContainer = styled.div<{ checked: boolean; disabled?: boolean }>`
  width: 25px;
  height: 25px;
  border-radius: 4px;

  background-color: ${({ checked, disabled }) =>
    disabled ? Colors.GRAY_4 : checked ? Colors.PRIMARY : Colors.GRAY_2};

  justify-content: center;
  align-items: center;

  cursor: ${({ disabled }) => (disabled ? "auto" : "pointer")};
`;

const RadioInput = styled.input`
  width: 0;
  height: 0;
`;

const Check = styled.img.attrs({ src: CheckImage })`
  margin-top: -3px;
  object-fit: contain;
  width: 50%;
  height: 50%;
`;

interface CheckboxProps extends React.ComponentPropsWithoutRef<"div"> {
  checked: boolean;
  value: any;
  disabled?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  value,
  disabled,
  ...props
}) => {
  return (
    <RadioContainer
      {...props}
      onClick={
        props.onClick && !disabled ? () => props.onClick!(value) : () => {}
      }
      checked={checked}
      disabled={disabled}
    >
      <RadioInput type="radio" />
      {checked && <Check />}
    </RadioContainer>
  );
};

export default Checkbox;
