import styled from "styled-components";

import Button from "../Button";

const IconButton = styled(Button).attrs({ imageSize: 14 })`
  background-color: transparent;

  width: 40px;
  height: 40px;
  border-radius: 15px;

  transition: background-color, 0.2s;

  margin-left: -8px;
  margin-bottom: -5px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  &:active {
    background-color: rgba(0, 0, 0, 0.35);
  }
`;

export default IconButton;
