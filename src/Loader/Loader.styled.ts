import styled from "styled-components";

export const StyledLoader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #000000;
  width: 100vw;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 20;
`;

export const StyledLoaderText = styled.div`
  color: #e50914;
  font-family: "Bebas Neue", sans-serif;
  font-size: 150px;
  letter-spacing: 2px;
  animation-name: fadeIn;
  animation-duration: 5s;
  animation-fill-mode: both;
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
