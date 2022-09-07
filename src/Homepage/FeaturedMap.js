import React, { useContext, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ActionBar from "../MapComponents/ActionBar";
import { ModalContext } from "../Contexts/ModalContext";
import { UserContext } from "../Contexts/UserContext";
import { animated, useSpring } from "react-spring";
const FeaturedMap = ({ game, isLiked, gameId, route }) => {
  const { showModal, setShowModal } = useContext(ModalContext);
  const navigate = useNavigate();
  const { currentUser, setStatus } = useContext(UserContext);
  const [numLikes, setNumLikes] = useState(game.likes);
  const [liked, setLiked] = useState(isLiked);

  const [hovered, setHovered] = useState(false);

  const style = useSpring({
    transform: hovered ? "scale(1.015)" : "scale(1)",
    config: {
      tension: 120,
      friction: 8,
    },
  });

  const likeGame = async () => {
    if (!currentUser) {
      setStatus({ error: "like a map" });
      return;
    }

    setLiked(!liked);
    fetch(`https://mapguesser-server.herokuapp.com/api/likeGame/${game._id}`, {
      method: "PATCH",
      body: JSON.stringify({
        liked: !liked,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      res.json();
    });

    await fetch(
      `https://mapguesser-server.herokuapp.com/api/addLikeToUser/${currentUser._id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          likedGame: game._id,
          liked: !liked,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (!liked) {
          setNumLikes(numLikes + 1);
        } else {
          setNumLikes(numLikes - 1);
        }
      });
  };

  return (
    <Container
      onClick={(ev) => {
        if (!showModal) {
          navigate(`game/${game._id}`);
          setShowModal(game._id);
        }
        ev.stopPropagation();
      }}
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => setHovered(false)}
      style={style}
    >
      <Title>{game.name}</Title>
      <Description>{game.description}</Description>
      <Author> Created by {game.creator}</Author>
      <Picture src={game.pic} />
      <ActionBar
        game={game}
        type="featured"
        likeGame={likeGame}
        liked={liked}
        featured={true}
        numLikes={numLikes}
      />
      {game._id === showModal || game._id === gameId ? (
        <Outlet
          context={[liked, setLiked, numLikes, setNumLikes, game, route]}
        />
      ) : null}
    </Container>
  );
};

export default FeaturedMap;

const Container = styled(animated.div)`
  flex: 1;
  width: 50%;
  height: 100%;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: 1149px) {
    width: 100%;
  }
`;

const Title = styled.h2`
  padding: 0 9px 2px;
  min-height: 0;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 5px 5px 0 0px;
  color: #1256d4;
  font-size: 30px;
  @media (max-width: 1240px) {
    font-size: 28px;
  }
`;
const Description = styled.h3`
  padding: 0 9px 2px;
  min-height: 0;
  background-color: rgba(255, 255, 255, 0.5);
  font-size: 20px;
  @media (max-width: 1414px) {
    font-size: 20px;
  }
`;
const Author = styled.p`
  min-height: 0;
  padding: 0 9px 2px;
  padding-bottom: 5px;
  background-color: rgba(255, 255, 255, 0.5);
  font-size: 20px;
  @media (max-width: 1414px) {
    font-size: 16px;
  }
`;

const Picture = styled.img`
  width: 100%;
  min-height: 0;
  padding: 0 9px;
  background-color: rgba(255, 255, 255, 0.5);
  flex: 1;
  object-fit: cover;
`;
