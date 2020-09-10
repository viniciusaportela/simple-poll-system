import React from "react";
import styled from "styled-components";
import { lighten } from "polished";

import Colors from "../../styles/colors";

const ButtonComponent = styled.button<{ flat?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  border: none;
  outline: none;

  width: min-content;
  height: min-content;

  padding: 0.7rem;
  border-radius: 4px;

  background-color: ${({ flat }) => (flat ? "transparent" : Colors.PRIMARY)};
  color: ${Colors.LIGHT};

  transition: background-color, 0.3s;

  &:hover {
    background-color: ${lighten(0.05, Colors.PRIMARY)};
    cursor: pointer;
  }

  &:active {
    background-color: ${lighten(0.09, Colors.PRIMARY)};
    transition: background-color, 0s;
    cursor: pointer;
  }
`;

const ButtonIcon = styled.img<{ size?: number | string }>`
  object-fit: contain;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;

  user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;
`;

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  withImage?: string;
  flat?: boolean;
  imageSize?: number | string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  withImage,
  imageSize,
  flat,
  ...props
}) => {
  return (
    <ButtonComponent flat={flat} {...props}>
      {withImage && (
        <ButtonIcon src={withImage} size={imageSize ? imageSize : 20} />
      )}
      {children}
    </ButtonComponent>
  );
};

export default Button;
