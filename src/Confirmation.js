import React, { useContext } from "react";
import styled from "styled-components";
import { MapCreationContext } from "./MapCreationContext";

const Confirmation = () => {
  const { confirmationDetails } = useContext(MapCreationContext);

  if (!confirmationDetails?.name) {
    return (
      <div>Please enter locations and map info to see confirmation page</div>
    );
  }

  return (
    <Container>
      <InnerContainer>
        <h1 style={{ color: "lightblue", alignSelf: "flex-start" }}>
          Map Created!
        </h1>
        <h2>{confirmationDetails.name}</h2>
        <h3>{confirmationDetails.description}</h3>
        {confirmationDetails.addresses.map((address) => {
          return <div>{address}</div>;
        })}
        <Pic src={confirmationDetails.pic} />
      </InnerContainer>
    </Container>
  );
};

const Container = styled.div`
  background-image: url("https://google-maps-bucket.s3.us-east-2.amazonaws.com/shutterstock_1228111945.jpg");
  background-size: cover;
  width: 100%;
  height: calc(100vh - 44px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
`;

const Pic = styled.img`
  width: 300px;
  height: 200px;
  align-self: center;
  margin-top: 10px;
`;

const InnerContainer = styled.div`
  background: rgba(0, 0, 0, 0.7);
  /* display: grid;
  place-content: center; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  div,
  h2,
  h3 {
    align-self: flex-start;
  }
  padding: 8px;
`;

export default Confirmation;
