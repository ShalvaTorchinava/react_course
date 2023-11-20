import styled from "styled-components";

export const StyledBackground = styled.img`
  position: absolute;
  width: 100%;
  z-index: -1;
  filter: brightness(0.08);
`;

export const StyledBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 1440px;
  height: 90vh;
  color: white;
  margin: 0 auto;
  padding-top: 100px;
  @media (max-width: 1440px) {
    width: 1024px;
  }
  @media (max-width: 1024px) {
    padding: 20px 0px;
    width: 90%;
    overflow-y: scroll;
  }
`;

export const StyledContentImage = styled.div`
  display: flex;
  width: 400px;
  @media (max-width: 1440px)  {
    width: 300px;
  }
  @media (max-width: 1024px) {
    display: none;
  }
`;

export const StyledContentPoster = styled.img`
  width: 400px;
  height: fit-content;
  @media (max-width: 1440px)  {
    width: 300px;
  }
`;

export const StyledContentNoPoster = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 600px;
  background-color: #000000;
  color: #e50914;
  font-family: "Bebas Neue", sans-serif;
  font-size: 54px;
  letter-spacing: 2px;
`;

export const StyledContentInfo = styled.div`
  width: 1000px;
  @media (max-width: 1440px)  {
    width: 684px;
  }
  @media (max-width: 1024px)  {
    width: 100%;
  }
`;

export const StyledContentTitle = styled.div`
  font-size: 48px;
  font-weight: 700;
  text-transform: uppercase;
`;

export const StyledContentData = styled.div`
  font-size: 24px;
  font-weight: 500;
  color: #9b9b9b;
`;

export const StyledContentButtons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  margin: 40px 0px;
  gap: 20px;
`;

export const StyledContentRating = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid ${({ color }) => color};
  border-radius: 100%;
  background: none;
  width: 70px;
  height: 70px;
  cursor: pointer;
  padding: 0;
  color: #fff;
  font-size: 28px;
  font-weight: 700;
`;

export const StyledContentButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid #454545;
  border-radius: 100%;
  width: 50px;
  height: 50px;
  background: none;
  cursor: pointer;
  padding: 0;
  &:hover {
    border-color: #fff;
  }
`;

export const StyledContentDescription = styled.div`
  font-size: 18px;
  line-height: 1.8;
  margin-bottom: 20px;
`;

export const StyledContentGenres = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #9b9b9b;
  text-transform: uppercase;
  margin-top: 15px;
`;

export const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  height: "70%",
  bgcolor: "#333333",
  border: "2px solid #000",
  boxShadow: 24,
};
