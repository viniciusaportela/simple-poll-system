import styled from "styled-components";

import IconButton from "../IconButton";
import Back from "../../assets/images/back.png";

const BackButton = styled(IconButton).attrs({
  withImage: Back,
})``;

export default BackButton;
