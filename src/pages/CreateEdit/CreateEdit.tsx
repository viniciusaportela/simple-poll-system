import React, { useState, useEffect, useRef } from "react";
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
import CheckDark from "../../assets/images/check_dark.png";

import formatDate from "../../utils/formatDate";
import getDateFromString from "../../utils/getDateFromString";

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

const OptionEdit = styled(IconButton).attrs({})``;

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

const OptionEditInput = styled(Input)`
  margin-right: auto;
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-bottom-color: ${Colors.GRAY_3};
  background-color: transparent;
  border-radius: 0px;
`;

const CreateEdit = () => {
  const history = useHistory();
  const { poll } = useParams();

  /**
   * *Only used in Edit*
   *
   * Saves the initial poll options to
   * compare which options were added, deleted or edited
   */
  const initialOptions = useRef<PollOptionWithVotes[]>([]);

  const [title, setTitle] = useState("");
  const [options, setOptions] = useState<Array<string | PollOptionWithVotes>>(
    []
  );
  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());

  const [calendarVisible, setCalendarVisible] = useState(false);
  const [calendarValue, setCalendarValue] = useState<
    undefined | "start" | "end"
  >();

  const [editing, setEditing] = useState<number | undefined>();
  const [editInput, setEditInput] = useState("");
  const [optionInput, setOptionInput] = useState("");

  useEffect(() => {
    // If is Editing
    if (poll) {
      PollService.get(parseInt(poll))
        .then((res: PollWithOptionsAndVotes) => {
          setTitle(res.title);
          setDateStart(getDateFromString(res.date_start));
          setDateEnd(getDateFromString(res.date_end));
          setOptions(res.options);
          initialOptions.current = res.options;
        })
        .catch((e) => alert("Erro ao pegar dados da votação"));
    }
  }, []);

  const goBack = () => {
    console.log("goBack");
    history.goBack();
  };

  /**
   * Creates a new Poll and redirect user
   * to the new Poll
   */
  const create = async () => {
    if (!inputsValidation()) return;

    try {
      const res = await PollService.create({
        title,
        options: options as string[],
        dateStart,
        dateEnd,
      });

      history.push(`/vote/${res.id}`);
    } catch (e) {
      alert("Erro ao adicionar");
    }
  };

  /**
   * Edit the selected Poll
   *
   * ```/edit/:poll <-```
   *
   * The URL slug represents the selected Poll Id
   */
  const edit = async () => {
    if (!inputsValidation()) return;

    try {
      await PollService.edit(parseInt(poll), {
        title,
        options: generateRequestEditOptions(initialOptions.current, options),
        dateStart,
        dateEnd,
      });

      history.push(`/vote/${poll}`);
    } catch (e) {
      alert("Erro ao editar");
    }
  };

  /**
   * The Back-End will receive a combination of instructions
   * to **remove** and **edit**
   *
   * ```json
   * {
   *  "remove": [1, 2],
   *  "edit": [{id: 3, value: "newValue"}]
   * }
   * ```
   *
   * @param oldOptions Initial Values, the options in database
   * @param newOptions
   */
  const generateRequestEditOptions = (
    oldOptions: PollOptionWithVotes[],
    newOptions: Array<PollOptionWithVotes | string>
  ) => {
    const remove = oldOptions
      .filter((oldOption) => {
        return (
          newOptions.findIndex((opt) => {
            // Since it's a string, that means that it's a new option
            // Added on front-end (So, also means that it was not sent by back-end,
            // so, it can't be deleted on database, since it doesn't exists there
            if (typeof opt === "string") {
              return false;
            } else {
              return (opt as PollOptionWithVotes).id === oldOption.id;
            }
          }) === -1
        );
      })
      .map((removed) => removed.id);

    const edit = newOptions
      .filter((newOption) => {
        // Same as above (in remove)
        if (typeof newOption === "string") {
          return false;
        } else {
          return (
            oldOptions.findIndex(
              (opt) =>
                opt.id === (newOption as PollOptionWithVotes).id &&
                opt.value !== (newOption as PollOptionWithVotes).value
            ) !== -1
          );
        }
      })
      .map((edited) => ({
        id: (edited as PollOptionWithVotes).id,
        value: (edited as PollOptionWithVotes).value,
      }));

    const add = newOptions.filter((option) => typeof option === "string");

    return {
      remove,
      edit,
      add: add as string[],
    };
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

  const editOption = (option: string | PollOptionWithVotes, index: number) => {
    if (isTheEditingIndex(index)) {
      return confirmEditOption(index, editInput);
    }

    setEditInput(typeof option === "string" ? option : option.value);
    setEditing(index);
  };

  const confirmEditOption = (index: number, newValue: string) => {
    setEditing(undefined);
    setOptions((options) =>
      options.map((option, optionIndex) => {
        if (optionIndex === index) {
          if (typeof option === "string") {
            return newValue;
          } else {
            return { ...option, value: newValue };
          }
        } else {
          return option;
        }
      })
    );
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

  const inputsValidation = () => {
    if (!title.trim()) {
      alert("O título não pode ser vázio");
      return false;
    }

    if (options.length < 3) {
      alert("Insira pelo menos 3 Opções");
      return false;
    }

    if (dateEnd.getTime() < dateStart.getTime()) {
      alert("A data final deve ser posterior à data inicial");
      return false;
    }

    return true;
  };

  const isTheEditingIndex = (currentIndex: number) => {
    return editing !== undefined && editing === currentIndex;
  };

  return (
    <BackgroundWithCard>
      <Row>
        <Col>
          <BackButton onClick={goBack} />
          <Title>{poll ? "Editar Votação" : "Criar Votação"}</Title>
        </Col>
        <CreateButton onClick={poll ? edit : create}>
          {poll ? "Editar" : "Criar"}
        </CreateButton>
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
          {isTheEditingIndex(idx) ? (
            <OptionEditInput state={[editInput, setEditInput]} />
          ) : (
            <OptionName>
              {typeof option === "string" ? option : option.value}
            </OptionName>
          )}
          <OptionEdit
            onClick={() => editOption(option, idx)}
            withImage={isTheEditingIndex(idx) ? CheckDark : Edit}
          />
          <OptionDelete onClick={() => removeOption(idx)} />
        </Option>
      ))}
    </BackgroundWithCard>
  );
};

export default CreateEdit;
