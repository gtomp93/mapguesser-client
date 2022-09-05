import React, { useContext, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import Comment from "./Comment";
import { UserContext } from "./Contexts/UserContext";
import ReactDOM from "react-dom";
import ActionBar from "./MapComponents/ActionBar";
import { BiX } from "react-icons/bi";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { Loading } from "./Loading";
import Error from "./Error";
import { ModalContext } from "./Contexts/ModalContext";
export default function GameModal() {
  const [comment, setComment] = useState("");
  const { currentUser, status, setStatus } = useContext(UserContext);
  const [inputValue, setInputValue] = useState("");
  const [viewMore, setViewMore] = useState(false);
  const { id } = useParams();
  const [gameInfo, setGameInfo] = useState(null);
  const [liked, setLiked, numLikes, setNumLikes, game, route] =
    useOutletContext();
  const { setShowModal } = useContext(ModalContext);
  const navigate = useNavigate();

  const likeGame = async () => {
    if (!currentUser) {
      setStatus({ error: "like" });
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

  const submitComment = async (comment, ev) => {
    if (!currentUser) {
      setStatus({ error: "comment on a map" });
      ev.preventDefault();
      ev.stopPropagation();
      return;
    }
    ev.stopPropagation();

    fetch(
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
        return res.json();
      })
      .then((res) => {
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
  }, [id]);

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

  return ReactDOM.createPortal(
    <Overlay>
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
              numLikes={numLikes}
              setNumLikes={setNumLikes}
              game={gameInfo}
              liked={liked}
              setLiked={setLiked}
            />{" "}
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
            <CommentsSection>
              <CommentsContainer>
                {gameInfo.comments.map((comment, index) => {
                  if (index >= gameInfo.comments.length - 2 && !viewMore) {
                    return <Comment key={index} comment={comment} />;
                  } else if (viewMore) {
                    return <Comment key={index} comment={comment} />;
                  } else {
                    return <React.Fragment key={index}></React.Fragment>;
                  }
                })}
              </CommentsContainer>{" "}
            </CommentsSection>
            <CreateComment>
              <CommentInput
                placeholder="comment"
                onClick={(e) => e.stopPropagation()}
                onChange={(ev) => {
                  ev.stopPropagation();
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
                disabled={!inputValue.length}
              >
                Comment
              </Submit>
            </CreateComment>{" "}
          </>
        ) : (
          <div>
            <Loading />
          </div>
        )}
        <CloseModal
          onClick={(ev) => {
            ev.stopPropagation();
            navigate(route ? route : "/profile");
            setShowModal(false);
          }}
        >
          <BiX />
        </CloseModal>
      </ModalContainer>
    </Overlay>,
    document.getElementById("portal")
  );
}
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 4;
`;

const Title = styled.h1`
  margin: 0;
  flex: 0;
  color: rgba(1, 2, 109, 1);
`;

const CloseModal = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 8;
  border-radius: 5px;
  margin: 6px;
  width: 25px;
  height: 25px;
  opacity: 0.5;
  display: grid;
  place-content: center;
`;

const Description = styled.h2`
  flex: 0;
`;

const Creator = styled.p`
  margin-bottom: 7px;
  flex: 0;
`;

const MapImage = styled.img`
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  flex: 0;
  min-height: 0;
`;

const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;

  flex: 1;
`;

const CommentsSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 15px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    background: rgba(250, 250, 250, 0.4);
    width: 15px;
    border-radius: 8px;
  }
  &::-webkit-scrollbar-thumb {
    width: 15px;
    background: rgba(157, 156, 156, 0.7);
    border-radius: 8px;
  }
  /* min-height: 45px; */
`;

const CreateComment = styled.div`
  margin-top: 7px;
  display: flex;
  align-items: center;
  padding: 0 0 5px;
`;

const fadein = keyframes`
from {opacity:0}
to{opacity:1}
`;

const ModalContainer = styled.div`
  position: fixed;
  /* height: 90%; */
  max-height: ${({ gameInfo }) => (gameInfo ? "85%" : "50%")};
  /* height: calc(92vh - 44px); */
  @media (max-width: 500px) {
    max-height: 80%;
  }
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 500px;
  z-index: 5;
  background: linear-gradient(
    225deg,
    rgba(102, 175, 243, 0.7962535355939251) 0%,
    rgba(255, 255, 255, 0.7234244039412641) 100%
  );
  padding: 5px 10px 10px 10px;
  border-radius: 6px;
  display: ${({ gameInfo }) => (gameInfo ? "flex" : "block")};
  flex-direction: column;
  justify-content: center;
  transition: 500ms;
  animation: 750ms ${fadein};
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
  color: #2b2b2b;
  background-color: none;
  background: none;
  border: none;
  font-size: 14px;
  font-weight: bolder;
  &:hover {
    cursor: pointer;
  }
  @media (min-width: 650px) {
    font-size: 16px;
  }
`;
