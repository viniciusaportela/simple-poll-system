import React from "react";
import styled from "styled-components";

import Colors from "../../styles/colors";
import LogoImage from "../../assets/images/logo.png";
import CardComponent from "../../components/Card";

const Container = styled.div`
  width: 100%;
  align-items: center;
`;

const TopBackground = styled.div`
  width: 100%;
  height: 10rem;
  background-color: ${Colors.PRIMARY};
`;

const Logo = styled.img.attrs({
  src: LogoImage,
})`
  object-fit: contain;

  position: absolute;
  left: 10px;
  top: 10px;

  width: 80px;

  user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;
`;

const Card = styled(CardComponent)`
  width: 90%;
  max-width: 600px;
  margin-top: -4rem;
  margin-bottom: 2rem;
`;

const BackgroundWithCard: React.FC = ({ children }) => {
  return (
    <Container>
      <TopBackground />
      <Logo />
      <Card>{children}</Card>
    </Container>
  );
};

export default BackgroundWithCard;
