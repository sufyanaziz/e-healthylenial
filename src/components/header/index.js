import React from "react";

import styled from "styled-components";

const Header = props => {
  return (
    <HeaderComponent>
      <h1>Healthy</h1>
      <h1>Lenial</h1>
    </HeaderComponent>
  );
};

const HeaderComponent = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  color: white;
  margin-bottom: 10px;

  h1 {
    font-size: 4rem;
  }
  h1:nth-child(1) {
    color: #8abf9c;
  }
  h1:nth-child(2) {
    margin-right: 45px;
    margin-left: 5px;
  }
`;

export default Header;
