import React from "react";
import styled from "styled-components";

import Colors from "../../styles/colors";

import LogoImage from "../../assets/images/logo.png";
import Card from "../../components/Card";

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
`;

const VotesCard = styled(Card)`
  width: 80%;
  margin-top: -4rem;
`;

const CategoryTitle = styled.h1`
  font-size: 1.15rem;
`;

const SeeAll: React.FC = () => {
  return (
    <Container>
      <TopBackground />
      <Logo />
      <VotesCard>
        <CategoryTitle>Votações Atuais</CategoryTitle>
        <CategoryTitle>Votações Futuras</CategoryTitle>
        <CategoryTitle>Votações Fechadas</CategoryTitle>
      </VotesCard>
    </Container>
  );
};

export default SeeAll;
