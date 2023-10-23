import { Button } from "@mui/material";
import styled from "styled-components";

const HeaderBox = styled.header`
  width: 100%;
  height: 10vh;
  background-color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  color: #e50914;
  font-family: "Bebas Neue", sans-serif;
  font-size: 40px;
  margin-left: 16px;
  letter-spacing: 2px;
`;

export default function Header() {
  return (
    <HeaderBox>
      <a href="#">
        <Logo>Gacheflix</Logo>
      </a>
      <Button
        variant="outlined"
        sx={{
          color: "white",
          borderColor: "white",
          "&:hover": { color: "white", borderColor: "#E50914" },
          marginRight: 2,
        }}
      >
        Sign in
      </Button>
    </HeaderBox>
  );
}
