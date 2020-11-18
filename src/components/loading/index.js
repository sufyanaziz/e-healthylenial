import styled from "styled-components";

const Loading = () => {
  return (
    <LoadingContainer>
      <p>Loading...</p>
    </LoadingContainer>
  );
};

const LoadingContainer = styled.div`
  position: absolute;
  background: white;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;

  p {
    color: black;
    text-align: center;
    margin: auto;
  }
`;

export default Loading;
