import React from "react";
import styled, { keyframes } from "styled-components";
import cloud from "../assets/Cloud Png.png";
const Cloud = () => {
  return (
    <>
      <Cloud1 src={cloud} />
      <Cloud2 src={cloud} />
    </>
  );
};

export default Cloud;

const drift1 = keyframes`
0%{transform:translateX(-100px)};
85%{opacity: 100%}

100%{transform:translateX(-120%) translateX(100vw);
 opacity: 0%}
`;

const drift2 = keyframes`
0%{transform:translateX(-400px)};
85%{opacity: 100%}

100%{transform:translateX(-120%) translateX(100vw);
 opacity: 0%}
`;

const Cloud1 = styled.img`
  animation: 11s ${drift1} linear infinite forwards;
  z-index: 1;
  @media (min-width: 800px) {
    animation: 25s ${drift1} linear infinite forwards;
  }

  @media (min-width: 1500px) {
    animation: 30s ${drift1} linear infinite forwards;
  }
  position: absolute;
  /* top: -2px; */
  left: 0;
  width: 120px;
`;

const Cloud2 = styled(Cloud1)`
  top: 80px;

  animation: 12s ${drift1} linear infinite forwards;
  display: none;

  @media (min-width: 800px) {
    animation: 27s ${drift2} linear infinite forwards;
    display: block;
  }

  @media (min-width: 1500px) {
    animation: 32s ${drift2} linear infinite forwards;
    display: block;
  }
`;
