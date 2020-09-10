import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 1rem;
  background-color: white;
  border-radius: 4px;
`;

interface CardProps {
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  return <Container className={className}>{children}</Container>;
};

export default Card;
