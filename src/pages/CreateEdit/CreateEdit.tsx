import React, { useState } from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import { useHistory, useParams } from "react-router-dom";

import BackgroundWithCard from "../../components/BackgroundWithCard";
import BackButton from "../../components/BackButton";
import IconButton from "../../components/IconButton";
import Input from "../../components/Input";
import Button from "../../components/Button";

import Colors from "../../styles/colors";
import isPair from "../../utils/isPair";
import PollService from "../../services/Poll";

import Add from "../../assets/images/add.png";
import Edit from "../../assets/images/edit.png";
import Delete from "../../assets/images/delete.png";
import formatDate from "../../utils/formatDate";

const Title = styled.h1`
  font-size: 1.3rem;
`;

const Label = styled.label``;

const Row = styled.div<{ center?: boolean }>`
  flex-direction: row;
  align-items: ${({ center }) => (center ? "center" : "flex-start")};
`;

const Col = styled.div`
  flex-direction: column;
`;

const CreateButton = styled(Button)`
  margin-left: auto;
  padding: 0.65rem 3rem;
`;

const Subtitle = styled.span`
  font-weight: 400;
  font-size: 1.1rem;
  margin-bottom: 0.3rem;
`;

const OptionsHeader = styled(Row)`
  margin: 0.5rem 0;
`;

const OptionsMinimum = styled.span`
  color: ${Colors.GRAY_3};
  font-size: 0.8rem;
`;

const Option = styled.div<{ strip: boolean }>`
  flex-direction: row;
  align-items: center;

  width: 100%;
  padding: 0.3rem;
  padding-left: 1rem;

  background-color: ${({ strip }) => (strip ? Colors.GRAY_1 : "transparent")};
`;

const OptionName = styled.span`
  margin-right: auto;
  font-size: 0.9rem;
`;

const OptionDelete = styled(IconButton).attrs({
  withImage: Delete,
})``;

const AddOptionInput = styled(Input)`
  flex: 1;
  margin-right: 1rem;
`;

const AddOptionButton = styled(Button).attrs({
  withImage: Add,
  imageSize: 9,
})`
  padding: 0.9rem;
`;

const BetweenDates = styled.span`
  margin: 0 1.2rem;
`;

const CalendarContainer = styled.div`
  background-color: ${Colors.GRAY_1};
  margin: 1.2rem 0;
  width: 100%;
  align-items: center;
`;

const CreateEdit = () => {
  const history = useHistory();
  const { poll } = useParams();

  const [title, setTitle] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());

  const [calendarVisible, setCalendarVisible] = useState(false);
  const [calendarValue, setCalendarValue] = useState<
    undefined | "start" | "end"
  >();

  const [isEditing, setIsEditing] = useState(false);
  const [optionInput, setOptionInput] = useState("");

  const goBack = () => {
    console.log("goBack");
    history.goBack();
  };

  const create = async () => {
    if (!title.trim()) return alert("O título não pode ser vázio");
    if (options.length < 3) return alert("Insira pelo menos 3 Opções");

    try {
      const res = await PollService.create({
        title,
        options,
        dateStart,
        dateEnd,
      });

      history.push(`/vote/${res.id}`);
    } catch (e) {
      alert("Erro ao adicionar");
    }
  };

  const addOption = () => {
    if (!optionInput.trim()) return;

    setOptions((options) => [...options, optionInput]);

    setOptionInput("");
  };

  const removeOption = (index: number) => {
    setOptions((opts) => {
      const newOptionsArray = [...opts];
      newOptionsArray.splice(index, 1);
      return newOptionsArray;
    });
  };

  const openCalendar = (editDate: "start" | "end") => {
    setCalendarVisible(true);
    setCalendarValue(editDate);
  };

  const onDateChange = (date: Date | Date[]) => {
    if (calendarValue === "start") {
      setDateStart(date as Date);
    } else if (calendarValue === "end") {
      setDateEnd(date as Date);
    }

    setCalendarVisible(false);
  };

  return (
    <BackgroundWithCard>
      <Row>
        <Col>
          <BackButton onClick={goBack} />
          <Title>Criar Votação</Title>
        </Col>
        <CreateButton onClick={create}>Criar</CreateButton>
      </Row>

      <Label>Título</Label>
      <Input state={[title, setTitle]} withMargin={5} />

      <Label>Data</Label>
      <Row center style={{ marginTop: 5 }}>
        <Button onClick={() => openCalendar("start")}>
          {formatDate(dateStart)}
        </Button>
        <BetweenDates>Até</BetweenDates>
        <Button onClick={() => openCalendar("end")}>
          {formatDate(dateEnd)}
        </Button>
      </Row>

      {calendarVisible && (
        <CalendarContainer>
          <Calendar
            onChange={onDateChange}
            value={calendarValue === "start" ? dateStart : dateEnd}
            minDate={calendarValue === "end" ? dateStart : undefined}
          />
        </CalendarContainer>
      )}

      <OptionsHeader>
        <Col>
          <Subtitle>Opções</Subtitle>
          <OptionsMinimum>Mínimo: 3</OptionsMinimum>
        </Col>
      </OptionsHeader>
      <Row style={{ marginBottom: 6 }}>
        <AddOptionInput
          placeholder="Item"
          id="addOptionInput"
          state={[optionInput, setOptionInput]}
          onEnter={addOption}
        />
        <AddOptionButton onClick={addOption} />
      </Row>
      {options.map((option, idx) => (
        <Option strip={isPair(idx)} key={idx}>
          <OptionName>{option}</OptionName>
          <OptionDelete onClick={() => removeOption(idx)} />
        </Option>
      ))}
    </BackgroundWithCard>
  );
};

export default CreateEdit;
