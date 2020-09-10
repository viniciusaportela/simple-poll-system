import React, { useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import PollService from "../../services/Poll";

function Vote() {
  const { poll } = useParams();

  useEffect(() => {
    PollService.get(poll)
      .then((res) => {})
      .catch((e) => {});
  }, []);

  return <div></div>;
}

export default Vote;
