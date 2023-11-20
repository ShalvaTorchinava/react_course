import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledNavigation = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
  width: 100%;
`;

export const StyledBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 90vh;
  overflow-y: scroll;
`;

export const StyledBoxMovies = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 1440px;
  @media (max-width: 1480px) {
    width: 1024px;
  }
  @media (max-width: 1080px) {
    width: 768px;
  }
  @media (max-width: 780px) {
    width: 600px;
  }
  @media (max-width: 630px) {
    width: 400px;
  }
  @media (max-width: 424px) {
    width: 300px;
  }
`;

export const StyledCards = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 40px;
  @media (max-width: 630px) {
    justify-content: center;
  }
`;

export const StyledLink = styled(Link)`
  width: calc(1440px / 5 - 40px);
  @media (max-width: 1480px) {
    width: calc(1024px / 3 - 40px);
  }
  @media (max-width: 1080px) {
    width: calc(728px / 2 - 40px);
  }
  @media (max-width: 780px) {
    width: calc(600px / 2 - 40px);
  }
  @media (max-width: 630px) {
    width: 400px;
  }
  @media (max-width: 424px) {
    width: 300px;
  }
`;

export const SkeletonCards = styled.div`
  width: calc(1440px / 5 - 40px);
  height: 330px;
  @media (max-width: 1480px) {
    width: calc(1024px / 3 - 40px);
  }
  @media (max-width: 1080px) {
    width: calc(728px / 2 - 40px);
  }
  @media (max-width: 780px) {
    width: calc(600px / 2 - 40px);
  }
  @media (max-width: 630px) {
    width: 400px;
  }
  @media (max-width: 424px) {
    width: 300px;
  }
`;
