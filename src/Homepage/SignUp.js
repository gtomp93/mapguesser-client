import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import styled from "styled-components";
import { Container } from "./styledComponents";
import { FiLogIn } from "react-icons/fi";
import { animated, useSpring } from "react-spring";

const SignUp = () => {
  const { loginWithRedirect } = useAuth0();
  const [hovered, setHovered] = useState(false);

  console.log(hovered);

  const style = useSpring({
    transform: hovered ? "scale(1.03)" : "scale(1)",
    config: {
      tension: 180,
      friction: 6,
    },
  });

  return (
    <StyledContainer
      onClick={() => loginWithRedirect()}
      onMouseEnter={() => {
        setHovered(true);
        console.log("Yoyo");
      }}
      onMouseLeave={() => setHovered(false)}
      style={style}
    >
      <Wrapper>
        <Message hovered={hovered}>
          Sign in or sign up to play <FiLogIn style={{ marginLeft: "0px" }} />
        </Message>
      </Wrapper>
    </StyledContainer>
  );
};

export default SignUp;

const Wrapper = styled.div`
  width: 100%;
  @media (max-width: 1149px) {
    min-height: 33vw;
  }
  height: 100%;
  background-image: url("https://google-maps-bucket.s3.us-east-2.amazonaws.com/shutterstock_1302294157.jpg");
  background-size: cover;
  background-position: center;
`;

const StyledContainer = styled(animated(Container))`
  padding: 0 15px 15px 12px;
  padding: 12px;
  transition: 200ms;
  cursor: pointer;
  min-height: 120px;
`;

const Message = styled.p`
  font-size: 35px;
  margin: 5px 0 0 10px;

  @media (max-width: 1266px) {
    font-size: 31px;
  }
  @media (max-width: 1149px) {
    font-size: 45px;
  }
  @media (max-width: 750px) {
    font-size: 7vw;
  }

  top: 20px;
  color: rgba(0, 0, 0, 0.8);
  color: darkblue;
  z-index: 3;
  font-weight: bold;
  display: flex;
  align-items: center;

  /* &:hover {
  } */
`;
