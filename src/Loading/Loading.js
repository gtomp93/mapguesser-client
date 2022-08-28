import React, { useContext, useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

import { FiLoader } from "react-icons/fi";

export const Loading = () => {
  return <Wrapper speed={1000}></Wrapper>;
};

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  margin: 25px auto auto auto;
  text-align: center;
`;

const Spinner = styled(FiLoader)`
  height: 100px;
  width: 100px;
  animation: App-logo-spin infinite 4s linear;
  color: #e8e6df;

  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
