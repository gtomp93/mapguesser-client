import React, { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../Contexts/UserContext";
import { Container, SubTitle } from "./styledComponents";
import FeaturedMap from "./FeaturedMap";

const Featured = ({ showModal, setShowModal, maps, gameId }) => {
  const { currentUser } = useContext(UserContext);

  return (
    <StyledContainer>
      <SubTitle style={{ fontSize: "38px" }}> Featured Maps </SubTitle>
      <StyledWrapper>
        {maps?.map((game) => {
          let isLiked = currentUser?.likes.includes(game._id);

          return (
            <FeaturedMap
              type="featured"
              game={game}
              isLiked={isLiked}
              key={Math.random() * 99999}
              showModal={showModal}
              setShowModal={setShowModal}
              gameId={gameId}
              route="/"
            />
          );
        })}
      </StyledWrapper>
    </StyledContainer>
  );
};

export default Featured;

const StyledContainer = styled(Container)`
  justify-content: flex-start;
  padding-left: 15px;
  padding-right: 15px;
  max-height: 100%;
  padding-bottom: 10px;
`;

const StyledWrapper = styled.div`
  height: calc(100% - 48px);
  display: flex;
  gap: 25px;

  @media (max-width: 650px) {
    flex-direction: column;
  }
`;
