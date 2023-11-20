import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const HeaderBox = styled.header`
  width: 100%;
  height: 10vh;
  background-color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 768px) {
    padding: 0px 10px;
  }
`;

export const StyleldLogo = styled.h1`
  color: #e50914;
  font-family: "Bebas Neue", sans-serif;
  font-size: 40px;
  margin-left: 16px;
  letter-spacing: 2px;
`;

export const StyledButtons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const StyledSerch = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  gap: 40px;
`;

export const StyledUl = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 40px;
`;

export const StyledNavLink = styled(NavLink)`
  text-transform: uppercase;
  color: #fff;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.75;
  letter-spacing: 0.02857em;
  &.active {
    color: #e50914;
  }
`;

export const StyledTextFieldSearch = styled.div`
  width: 100%;
  height: 720px;
  opacity: 1;
  position: absolute;
  top: 50px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 5px;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 1px;
  }
`;

export const StyledContentBox = styled.div`
  width: 100%;
  height: 140px;
  display: flex;
  flex-direction: row;
  border: 2px solid black;
`;

export const StyledContentBackdrop = styled.div`
  width: 50%;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const StyledContentImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const StyledContentNoImg = styled.div`
  width: 100%;
  height: 140px;
  background-color: #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  text-transform: uppercase;
  font-size: 40px;
  color: #e50914;
  font-family: "Bebas Neue", sans-serif;
  letter-spacing: 2px;
`;

export const StyledContentTitle = styled.div`
  width: 50%;
  background-color: rgba(25, 25, 25, 0.8);
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #fff;
  font-size: 20px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const StyledBurger = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  background: unset;
  border: unset;
  padding: 0;
`;

export const StyledDrowerBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #191919;
  width: 250px;
  height: 100%;
  padding: 15px;
  cursor: pointer;
`;

export const StyledLaptopButtons = styled.div`
  display: none;
  flex-direction: row;
  height: 100%;
  align-items: center;
  gap: 20px;
  @media (max-width: 768px) {
    display: flex;
  }
`;

export const StyledBurgerUl = styled.ul`
  display: flex;
  flex-direction: column;
`;

export const StyledBurgerCross = styled.button`
  display: flex;
  position: absolute;
  right: 0;
  top: 0;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  background: unset;
  border: unset;
  cursor: pointer;
`;

export const StyleldLogoMedium = styled.div`
  display: flex;
  align-items: center;
  color: #e50914;
  font-family: "Bebas Neue", sans-serif;
  font-size: 40px;
  letter-spacing: 2px;
  @media (max-width: 450px) {
    display: none;
  }
`;

export const StyleldBurgerLogo = styled.div`
  display: none;
  align-items: center;
  color: #e50914;
  font-family: "Bebas Neue", sans-serif;
  font-size: 30px;
  letter-spacing: 2px;
  @media (max-width: 450px) {
    display: flex;
  }
`;

export const StyledSerchButton = styled.button`
  border: unset;
  background-color: unset;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 180px;
  top: 10px;
  cursor: pointer;
`;
