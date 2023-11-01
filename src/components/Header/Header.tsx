import { Button } from "@mui/material";

import {
  HeaderBox,
  Logo,
  StyledButtons,
  StyledNavLink,
  StyledSerch,
  StyledTextField,
  StyledUl,
} from "./Header.styled";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <HeaderBox>
      <StyledButtons>
        <Link to={"/"}>
          <Logo>Gacheflix</Logo>
        </Link>
        <StyledUl>
          <li>
            <StyledNavLink to={"/movies"}>Movies</StyledNavLink>
          </li>
          <li>
            <StyledNavLink to={"/tvshows"}>TV Shows</StyledNavLink>
          </li>
        </StyledUl>
      </StyledButtons>
      <StyledSerch>
        <StyledTextField
          id="outlined-basic"
          label="Search..."
          variant="outlined"
          size="small"
          sx={{width: '20vw'}}
        />
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
      </StyledSerch>
    </HeaderBox>
  );
};

export default Header;
