import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const Code404 = styled.span`
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const Code404Description = styled.span``;

const _404: React.FC = (props) => {
  return (
    <Container>
      <Code404>404</Code404>
      <Code404Description>Não encontramos essa página</Code404Description>
    </Container>
  );
};

export default _404;
