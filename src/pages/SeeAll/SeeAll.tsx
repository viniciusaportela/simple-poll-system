import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import BackgroundWithCard from "../../components/BackgroundWithCard";
import Button from "../../components/Button";
import IconButton from "../../components/IconButton";

import isPair from "../../utils/isPair";
import Colors from "../../styles/colors";

import Delete from "../../assets/images/delete.png";
import Edit from "../../assets/images/edit.png";

const CategoryTitle = styled.h1`
  font-size: 1.15rem;
`;

const Alert = styled.div`
  flex-direction: row;
  background-color: ${Colors.PRIMARY_FADED};
  border-radius: 4px;
  padding: 0.3rem;
  align-items: center;
`;

const AlertText = styled.span`
  margin-right: auto;
`;

const AlertButton = styled(Button)`
  padding: 0.6rem 3rem;
`;

const Poll = styled.div<{ strip?: boolean }>`
  padding: 0.3rem;
  flex-direction: row;
  align-items: center;
  width: 100%;
  background-color: ${({ strip }) => (strip ? Colors.GRAY_1 : "transparent")};
`;

const PollName = styled.span`
  margin-right: auto;
`;

const PollEdit = styled(IconButton).attrs({
  withImage: Edit,
})``;

const PollDelete = styled(IconButton).attrs({
  withImage: Delete,
})``;

const PollVote = styled(Button)``;

const SeeAll: React.FC = () => {
  const history = useHistory();

  const goToCreate = () => {
    history.push("/create");
  };

  return (
    <BackgroundWithCard>
      <Alert>
        <AlertText>Crie sua votação de forma simples!</AlertText>
        <AlertButton onClick={goToCreate}>Criar</AlertButton>
      </Alert>
      <CategoryTitle>Votações Atuais</CategoryTitle>
      <Poll strip={isPair(0)}>
        <PollName>Votação 1</PollName>
        <PollEdit />
        <PollDelete />
        <PollVote>Votar</PollVote>
      </Poll>
      <CategoryTitle>Votações Futuras</CategoryTitle>
      <CategoryTitle>Votações Fechadas</CategoryTitle>
    </BackgroundWithCard>
  );
};

export default SeeAll;
