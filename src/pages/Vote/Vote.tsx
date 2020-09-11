import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";

import BackgroundWithCard from "../../components/BackgroundWithCard";
import BackButton from "../../components/BackButton";
import Checkbox from "../../components/Checkbox";
import Button from "../../components/Button";

import PollService from "../../services/Poll";
import Colors from "../../styles/colors";
import PollVote from "../../services/PollVote";
import formatDate from "../../utils/formatDate";
import getDateFromString from "../../utils/getDateFromString";

const Title = styled.h1`
  font-size: 1.3rem;
`;

const Votes = styled.span`
  margin-top: -0.4rem;
  margin-bottom: 1rem;
  color: ${Colors.GRAY_3};
`;

const Option = styled.div`
  flex-direction: row;
  align-items: center;

  width: 100%;
  padding: 0.3rem;
`;

const OptionName = styled.label`
  font-size: 0.9rem;
  margin-right: auto;
`;

const VoteButton = styled(Button)`
  margin-top: 1.1rem;
  margin-left: auto;
  padding: 0.6rem 3rem;
`;

const OptionVote = styled(Checkbox)`
  margin-right: 0.4rem;
`;

const PollDate = styled.span`
  font-size: 0.9rem;
  margin-top: 1rem;
  margin-bottom: -0.3rem;
`;

function Vote() {
  const history = useHistory();
  const { poll } = useParams();

  const [pollData, setPollData] = useState<
    PollWithOptionsAndVotes | undefined
  >();
  const [selectedOption, setSelectedOption] = useState<number | undefined>();

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    PollService.get(poll)
      .then((res: PollWithOptionsAndVotes) => {
        if (
          new Date().getTime() > getMaxTimeFromDayString(res.date_end) ||
          new Date().getTime() < getMinTimeFromDayString(res.date_start)
        ) {
          setDisabled(true);
        }

        setPollData(res);
      })
      .catch((e) => {
        alert("Erro ao carregar informações da votação");
      });
  }, []);

  const getMinTimeFromDayString = (dateString: string) => {
    const date = getDateFromString(dateString);

    return new Date(date).getTime();
  };

  const getMaxTimeFromDayString = (dateString: string) => {
    const date = getDateFromString(dateString);

    const maxTimeDateString = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()} 23:59:59`;

    return new Date(maxTimeDateString).getTime();
  };

  const goBack = () => {
    history.push("/");
  };

  const vote = async () => {
    if (!selectedOption) alert("Selecione uma opção primeiro");

    try {
      await PollVote.vote(selectedOption!);

      setDisabled(true);
      setSelectedOption(undefined);
    } catch (e) {
      alert("Erro ao votar");
    }
  };

  const onSelectOption = (option: any) => {
    setSelectedOption(option);
  };

  return (
    <BackgroundWithCard>
      <BackButton onClick={goBack} />
      <PollDate>
        {formatDate(pollData?.date_start || Date())} -{" "}
        {formatDate(pollData?.date_end || Date())}
      </PollDate>
      <Title>{pollData?.title}</Title>
      <Votes>{pollData?.votes || 0} votos</Votes>
      {pollData?.options?.map((option) => (
        <Option>
          <OptionVote
            checked={selectedOption === option.id}
            value={option.id}
            id={String(option.id)}
            disabled={disabled}
            onClick={onSelectOption}
          />
          <OptionName htmlFor={String(option.id)}>
            {option.value} ({option.votes} Votos)
          </OptionName>
        </Option>
      ))}
      {selectedOption && <VoteButton onClick={vote}>Votar</VoteButton>}
    </BackgroundWithCard>
  );
}

export default Vote;
