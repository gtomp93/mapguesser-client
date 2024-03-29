import React from "react";
import { FiHeart, FiMapPin, FiMap } from "react-icons/fi";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Container } from "./styledComponents";

const ProfileLinks = () => {
  return (
    <StyledContainer>
      <Wrapper>
        <StyledLink to="/profile">
          <Title>Liked Maps</Title>
          <StyledFiHeart
            style={{
              display: "block",
              fill: "lightpink",
            }}
          />
        </StyledLink>
        <StyledLink to="/profile/created">
          {" "}
          <Title>Created Maps</Title>
          <StyledFiMapPin
            style={{
              display: "block",
              fill: "lightgreen",
            }}
          />
        </StyledLink>
        <StyledLink to="/profile/active">
          {" "}
          <Title>Active Games</Title>
          <StyledFiMap
            style={{
              fill: "green",
            }}
          />
        </StyledLink>
      </Wrapper>
    </StyledContainer>
  );
};

export default ProfileLinks;

const StyledContainer = styled(Container)`
  padding-bottom: 10px;
  @media (max-width: 750px) {
    padding: 0px 0 0px;
  }
`;

const StyledLink = styled(Link)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  justify-content: center;
  &:hover {
    transform: scale(1.04);
  }
  @media (max-width: 1149px) {
    height: 33%;
    flex-direction: row;
  }
  @media (max-width: 1150px) {
    flex-direction: column;
    height: 100%;
  }
  @media (max-width: 450px) {
    height: 70%;
  }
`;
const Title = styled.h2`
  font-size: 35px;
  text-align: center;
  @media (max-width: 1149px) {
    font-size: 40px;
  }
  @media (max-width: 450px) {
    /* height: 180px;
    height: 100px; */
    width: 100%;
    font-size: 29px;
  }
`;

const Wrapper = styled.div`
  margin: 0 auto;
  height: 100%;
  width: 100%;
  display: flex;
  @media (max-width: 1250px) {
    flex-direction: column;
    width: 80%;
  }
  justify-content: space-between;
  align-items: center;
  @media (max-width: 1150px) {
    height: 180px;
    width: 100%;
    flex-direction: row;
    /* padding: 0px 0 0px; */
  }
`;

const StyledFiMap = styled(FiMap)`
  width: 33%;
  height: 60%;
  @media (min-width: 1250px) {
    width: 80%;
  }
`;

const StyledFiMapPin = styled(FiMapPin)`
  width: 25%;
  width: 33%;
  height: 60%;

  @media (min-width: 1250px) {
    width: 80%;
  }
`;

const StyledFiHeart = styled(FiHeart)`
  width: 33%;
  height: 60%;
  @media (min-width: 1250px) {
    width: 80%;
  }
`;
