import { TextField } from "@mui/material";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const HeaderBox = styled.header`
  width: 100%;
  height: 10vh;
  background-color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled.h1`
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
`;

export const StyledSerch = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
`;

export const StyledTextField = styled(TextField)`
  & label.MuiFormLabel-root {
    color: white;
  }

  & .MuiInputBase-input {
    color: white;
  }
  & label.Mui-focused {
    color: white;
  }
  & .MuiInput-underline:after {
    border-bottom-color: white;
  }
  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: #e50914;
    }
    &:hover fieldset {
      border-color: #e50914;
    }
    &.Mui-focused fieldset {
      border-color: #e50914;
    }
  }
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