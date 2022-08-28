import React from "react";
import { useOutletContext } from "react-router-dom";
import Map from "../MapComponents/Map";
import styled from "styled-components";

const LikedMaps = () => {
  const [games, currentUser, deleteGame] = useOutletContext();
  return (
    <>
      {games.liked.length ? (
        <GamesContainer>
          {games.liked.map((game) => {
            if (game) {
              let isLiked = currentUser.likes.includes(game._id);
              return (
                // <div style={{ display: "flex", flexDirection: "column" }}>
                <Map
                  key={Math.random() * 9999}
                  game={game}
                  isLiked={isLiked}
                  deleteGame={deleteGame}
                  type="profile"
                  route="/profile"
                />
                // </div>
              );
            } else {
              return <></>;
            }
          })}
        </GamesContainer>
      ) : (
        <Message>You haven't liked any maps yet 😢.</Message>
      )}
    </>
  );
};

export default LikedMaps;

const GamesContainer = styled.div`
  max-width: calc(100% - 40px);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  @media (max-width: 330px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
  gap: 32px;
  margin: 15px 0 20px;
  color: black;
`;

const Message = styled.h2`
  color: white;
  margin-top: 20px;
  max-width: 500px;
  width: 95%;
  text-align: center;
`;
