import React, { useState } from "react";
import styled from "styled-components";
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

const Title = styled.h1`
  font-size: 1.3rem;
`;

const Label = styled.label``;

const Row = styled.div`
  flex-direction: row;
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

const OptionEdit = styled(IconButton).attrs({
  withImage: Edit,
})``;

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
  height: 100%;
`;

const CreateEdit = () => {
  const history = useHistory();
  const { poll } = useParams();

  const [title, setTitle] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());

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
        dateStart: "2020/09/10",
        dateEnd: "2020/09/11",
      });

      history.push(`/vote/${res.id}`);
    } catch (e) {
      // isApiError()
    }
  };

  const addOption = () => {
    if (!optionInput.trim()) return;

    setOptions((options) => [...options, optionInput]);

    setOptionInput("");
  };

  const removeOption = (index: number) => {
    setOptions((opts) => {
      const newOptionsArray = { ...opts };
      newOptionsArray.splice(index, 1);
      return newOptionsArray;
    });
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
          <OptionEdit />
          <OptionDelete />
        </Option>
      ))}
    </BackgroundWithCard>
  );
};

export default CreateEdit;
