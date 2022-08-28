import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ActionBar from "./MapComponents/ActionBar";
import Comment from "./Comment";
import Error from "./Error";
import { Loading } from "./Loading";
import { UserContext } from "./Contexts/UserContext";

const MapDetails = () => {
  const { id } = useParams();

  const [comment, setComment] = useState("");
  const { currentUser, status, setStatus } = useContext(UserContext);
  const [inputValue, setInputValue] = useState("");
  const [viewMore, setViewMore] = useState(false);
  const [gameInfo, setGameInfo] = useState(null);
  const [liked, setLiked] = useState(
    currentUser ? currentUser.likes.includes(id) : false
  );
  const [numLikes, setNumLikes] = useState(0);
  const likeGame = async () => {
    if (!currentUser) {
      setStatus({ error: "like" });
      return;
    }

    setLiked(!liked);
    fetch(`https://mapguesser-server.herokuapp.com/api/likeGame/${id}`, {
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
          likedGame: id,
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

  const submitComment = async (comment, ev) => {
    if (!currentUser) {
      setStatus({ error: "comment" });
      ev.preventDefault();
      ev.stopPropagation();
      return;
    }

    await fetch(
      `https://mapguesser-server.herokuapp.com/api/comment/${gameInfo._id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          comment: comment,
          commentBy: currentUser._id,
          pic: currentUser.picture,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        res.json();
      })
      .then((res) => {
        // setUpdatePage(!updatePage);
        setGameInfo({
          ...gameInfo,
          comments: [
            ...gameInfo.comments,
            { comment, commentBy: currentUser._id, pic: currentUser.picture },
          ],
        });
      });
  };
  useEffect(() => {
    fetch(`https://mapguesser-server.herokuapp.com/api/getGame/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setGameInfo(res.result);
      });
  }, [id, currentUser]);

  useEffect(() => {
    if (currentUser) setLiked(currentUser.likes.includes(id));
  }, [currentUser]);

  const { name, description, creator, pic } = gameInfo
    ? gameInfo
    : {
        name: undefined,
        description: undefined,
        creator: undefined,
        pic: undefined,
        // likeGame: undefined,
        likes: undefined,
      };

  return (
    <Background>
      {status === "loginError" && <Error setStatus={setStatus} />}

      <ModalContainer gameInfo={gameInfo}>
        {gameInfo ? (
          <>
            <Title>{name}</Title>
            <Description>{description}</Description>
            <Creator>Created by {creator}</Creator>
            <MapImage src={pic} />
            <ActionBar
              likeGame={likeGame}
              numLikes={gameInfo?.likes}
              setNumLikes={setNumLikes}
              game={gameInfo}
              liked={liked}
              setLiked={setLiked}
            />
            <CommentsSection>
              {gameInfo.comments.length > 2 && (
                <View
                  onClick={(e) => {
                    e.stopPropagation();
                    setViewMore(!viewMore);
                  }}
                >
                  {viewMore ? "View Less Comments" : "View More Comments"}
                </View>
              )}
              {gameInfo.comments.map((comment, index) => {
                if (index >= gameInfo.comments.length - 2 && !viewMore) {
                  return (
                    <Comment key={Math.random() * 999999} comment={comment} />
                  );
                } else if (viewMore) {
                  return (
                    <Comment key={Math.random() * 999999} comment={comment} />
                  );
                }
              })}
              <CreateComment>
                <CommentInput
                  placeholder="comment"
                  onClick={(e) => e.stopPropagation()}
                  onChange={(ev) => {
                    setComment(ev.target.value);
                    setInputValue(ev.target.value);
                  }}
                  value={inputValue}
                ></CommentInput>
                <Submit
                  onClick={(ev) => {
                    ev.stopPropagation();
                    submitComment(comment, ev);
                    setInputValue("");
                  }}
                >
                  Comment
                </Submit>
              </CreateComment>
            </CommentsSection>{" "}
          </>
        ) : (
          <div>
            <Loading />
          </div>
        )}
        {/* <CloseModal
          onClick={(ev) => {
            ev.stopPropagation();
            navigate(route ? route : "/profile");
            setShowModal(false);
          }}
        >
          <BiX />
        </CloseModal> */}
      </ModalContainer>
    </Background>
  );
};

const Background = styled.div`
  width: 100%;
  height: calc(100vh - 44px);
  background-image: url("https://google-maps-bucket.s3.us-east-2.amazonaws.com/shutterstock_693729124.jpg");
  background-size: cover;
`;

const Title = styled.h1`
  margin: 0;
`;

const Description = styled.h2``;

const Creator = styled.p``;

const MapImage = styled.img`
  width: 100%;
  max-height: 300px;
  object-fit: cover;
`;

const CommentsSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const CreateComment = styled.div`
  margin-top: 7px;
  display: flex;
  align-items: center;
  padding: 0 0 5px;
`;

const ModalContainer = styled.div`
  position: fixed;
  max-height: ${({ gameInfo }) => (gameInfo ? "90%" : "50%")};
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 500px;
  z-index: 5;
  background: rgba(132, 168, 201, 0.808);
  background: rgb(102, 175, 243);
  background: linear-gradient(
    225deg,
    rgba(102, 175, 243, 0.7962535355939251) 50%,
    rgba(255, 255, 255, 0.7234244039412641) 100%
  );
  padding: 5px 10px 10px 10px;
  border-radius: 6px;
  display: ${({ gameInfo }) => (gameInfo ? "block" : "flex")};
  justify-content: center;
`;

const CommentInput = styled.textarea`
  border-radius: 7px;
  width: 100%;
  resize: none;
  @media (min-width: 769px) {
  }
`;

const Submit = styled.button`
  margin-left: 6px;
  border-radius: 6px;
  background: #e8e6df;
  border: none;
  height: 30px;
  font-weight: bolder;
  background-color: rgba(0, 0, 0, 0.7);
  background-color: #07024d;
  border-radius: 9px 9px 9px 0;
  padding: 0 5px 0;
  color: #d3d2d9;
`;

const View = styled.button`
  all: unset;
  color: #e8e6df;
  color: #2b2b2b;
  font-weight: bolder;
  background-color: none;
  background: none;
  border: none;
  font-size: 14px;

  &:hover {
    cursor: pointer;
  }
  @media (min-width: 650px) {
    font-size: 16px;
  }
`;

export default MapDetails;
