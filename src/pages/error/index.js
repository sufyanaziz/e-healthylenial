import React from "react";
import styled from "styled-components";

const ErrorPage = () => {
  return (
    <ErrorContainer>
      <p>404</p>
      <p>|</p>
      <p>Page is not found</p>
    </ErrorContainer>
  );
};

const ErrorContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    font-size: 20px;
  }
  p:nth-child(2) {
    margin: 0 10px;
  }
`;

export default ErrorPage;
