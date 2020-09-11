import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import BackgroundWithCard from "../../components/BackgroundWithCard";
import Button from "../../components/Button";
import IconButton from "../../components/IconButton";

import isPair from "../../utils/isPair";
import Colors from "../../styles/colors";

import Delete from "../../assets/images/delete.png";
import Edit from "../../assets/images/edit.png";
import PollService from "../../services/Poll";
import formatDate from "../../utils/formatDate";

const CategoryTitle = styled.h1`
  font-size: 1.15rem;
`;

const Alert = styled.div`
  background-color: ${Colors.PRIMARY_FADED};
  border-radius: 4px;
  padding: 0.3rem;
  align-items: center;

  @media (min-width: 500px) {
    flex-direction: row;
  }
`;

const AlertText = styled.span`
  margin-right: auto;
`;

const AlertButton = styled(Button)`
  margin-top: 0.6rem;
  width: 100%;
  padding: 0.6rem 3rem;

  @media (min-width: 500px) {
    flex-direction: row;
    width: min-content;
    margin-top: 0;
  }
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

const Col = styled.div``;

const PollDate = styled.span`
  font-size: 0.7rem;
`;

const SeeAll: React.FC = () => {
  const history = useHistory();

  const [polls, setPolls] = useState<PollList | undefined>();

  useEffect(() => {
    PollService.getAll()
      .then((polls) => {
        setPolls(polls);
      })
      .catch((e) => alert("Erro ao carregar votações"));
  }, []);

  const goToCreate = () => {
    history.push("/create");
  };

  const goToVote = (pollId: number) => {
    history.push(`/vote/${pollId}`);
  };

  const deletePoll = async (
    pollId: number,
    pollCategory: "soon" | "finished" | "going"
  ) => {
    try {
      await PollService.delete(pollId);

      setPolls((polls) => ({
        ...polls!,
        [pollCategory]: polls![pollCategory].filter(
          (poll) => poll.id !== pollId
        ),
      }));
    } catch (e) {
      alert("Erro ao deletar");
    }
  };

  const editPoll = (pollId: number) => {
    history.push(`/edit/${pollId}`);
  };

  return (
    <BackgroundWithCard>
      <Alert>
        <AlertText>Crie sua votação de forma simples!</AlertText>
        <AlertButton onClick={goToCreate}>Criar</AlertButton>
      </Alert>

      {(polls?.going.length || 0) > 0 && (
        <>
          <CategoryTitle>Votações Atuais</CategoryTitle>
          {polls?.going.map((poll, idx) => (
            <Poll strip={isPair(idx)}>
              <Col style={{ marginRight: "auto" }}>
                <PollName>{poll.title}</PollName>
                <PollDate>
                  {formatDate(poll.date_start)} - {formatDate(poll.date_end)}
                </PollDate>
              </Col>
              <PollEdit onClick={() => editPoll(poll.id)} />
              <PollDelete onClick={() => deletePoll(poll.id, "going")} />
              <PollVote onClick={() => goToVote(poll.id)}>Votar</PollVote>
            </Poll>
          ))}
        </>
      )}

      {(polls?.soon.length || 0) > 0 && (
        <>
          <CategoryTitle>Votações Futuras</CategoryTitle>
          {polls?.soon.map((poll, idx) => (
            <Poll strip={isPair(idx)}>
              <Col style={{ marginRight: "auto" }}>
                <PollName>{poll.title}</PollName>
                <PollDate>
                  {formatDate(poll.date_start)} - {formatDate(poll.date_end)}
                </PollDate>
              </Col>
              <PollEdit onClick={() => editPoll(poll.id)} />
              <PollDelete onClick={() => deletePoll(poll.id, "soon")} />
              <PollVote onClick={() => goToVote(poll.id)}>Votar</PollVote>
            </Poll>
          ))}
        </>
      )}

      {(polls?.finished.length || 0) > 0 && (
        <>
          <CategoryTitle>Votações Finalizadas</CategoryTitle>
          {polls?.finished.map((poll, idx) => (
            <Poll strip={isPair(idx)}>
              <Col style={{ marginRight: "auto" }}>
                <PollName>{poll.title}</PollName>
                <PollDate>
                  {formatDate(poll.date_start)} - {formatDate(poll.date_end)}
                </PollDate>
              </Col>
              <PollEdit onClick={() => editPoll(poll.id)} />
              <PollDelete onClick={() => deletePoll(poll.id, "finished")} />
              <PollVote onClick={() => goToVote(poll.id)}>Votar</PollVote>
            </Poll>
          ))}
        </>
      )}
    </BackgroundWithCard>
  );
};

export default SeeAll;
