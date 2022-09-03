import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { animated, useSpring } from "react-spring";
import styled, { keyframes } from "styled-components";
import { UserContext } from "../Contexts/UserContext";
import { Container } from "./styledComponents";
import { BiMapPin } from "react-icons/bi";
import { SubTitle } from "./styledComponents";
const CreateMap = () => {
  let Navigate = useNavigate();

  const { currentUser, setStatus } = useContext(UserContext);
  const [hovered, setHovered] = useState(false);

  const style = useSpring({
    transform: hovered ? "scale(1.015)" : "scale(1)",
    config: {
      tension: 120,
      friction: 8,
    },
  });

  return (
    <CreateContainer
      onClick={() => {
        if (currentUser) {
          Navigate("/CreateMapForm");
        } else {
          setStatus({ error: "create" });
        }
      }}
      style={style}
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => setHovered(false)}
    >
      <SubTitle style={{ margin: "10px 0 10px" }}>
        Create Map
        <BiMapPin style={{ fill: "darkRed", marginLeft: "5px" }} />
      </SubTitle>
      <Image src="https://google-maps-bucket.s3.us-east-2.amazonaws.com/shutterstock_1932939785.jpg" />
    </CreateContainer>
  );
};

export default CreateMap;

const Image = styled.img`
  width: 100%;
  height: 92%;
  object-fit: cover;
  min-height: 0;
  flex: 1;
  /* object-position: ; */
  border-radius: 6px;
`;

const CreateContainer = styled(animated(Container))`
  cursor: pointer;
  /* &:hover {
    transform: scale(1.01);
  }
  transition: 400ms; */

  background-size: 200%;
`;
