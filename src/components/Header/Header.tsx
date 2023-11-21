import { Button, TextField} from "@mui/material";
import {
  HeaderBox,
  StyledButtons,
  StyledContentBox,
  StyledContentBackdrop,
  StyledContentImg,
  StyledNavLink,
  StyledSerch,
  StyledTextFieldSearch,
  StyledUl,
  StyledContentTitle,
  StyledContentNoImg,
  StyleldLogo,
  StyledBurger,
  StyledDrowerBox,
  StyledBurgerUl,
  StyledBurgerCross,
  StyleldLogoMedium,
  StyledLaptopButtons,
  StyleldBurgerLogo,
  StyledSerchButton,
} from "./Header.styled";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { SingleContentProps } from "../../types/search";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { getSearchContent } from "../../api/api";

const Header = () => {
  const [searchContent, setSearchContent] = useState<SingleContentProps[] | []>(
    []
  );
  const [searchValue, setSearchValue] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [openDrower, setOpenDrower] = useState<boolean>(false);
  const listInnerRef = useRef(null);

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (Math.round(scrollTop + clientHeight) === scrollHeight) {
        setPage(page + 1);
      }
    }
  };

  const serchHandler = (value: string) => {
    setSearchContent([]);
    setSearchValue(value);
  };

  const filterContent = (searchContent: SingleContentProps[] | null) => {
    if (searchContent) {
      const result = searchContent.filter(
        (item) => item.media_type !== "person"
      );
      return result;
    }
  };

  useEffect(() => {
    if (searchValue.length > 2) {
      getSearchContent(searchValue, page)
        .then((response) =>
          setSearchContent([...searchContent, ...response.results])
        )
        .catch((err) => console.error(err));
    }
  }, [searchValue, page]);

  const renderSerchContent = () => {
    if (searchValue) {
      return (
        <StyledTextFieldSearch onScroll={onScroll} ref={listInnerRef}>
          {filterContent(searchContent)?.map((item, index) => {
            return (
              <Link
                to={`/${item.media_type}s/${item.id}`}
                key={index}
                onClick={() => {
                  setSearchValue("");
                }}
              >
                <StyledContentBox>
                  <StyledContentBackdrop>
                    {item.backdrop_path ? (
                      <StyledContentImg
                        src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
                        alt=""
                      />
                    ) : (
                      <StyledContentNoImg>
                        <p>Gacheflix</p>
                      </StyledContentNoImg>
                    )}
                  </StyledContentBackdrop>
                  <StyledContentTitle>
                    <h3>{item.title || item.name}</h3>
                    <p>
                      {(item.release_date && item.release_date.slice(0, 4)) ||
                        (item.first_air_date &&
                          item.first_air_date.slice(0, 4))}
                    </p>
                  </StyledContentTitle>
                </StyledContentBox>
              </Link>
            );
          })}
        </StyledTextFieldSearch>
      );
    }
  };

  const getDrowerList = () => {
    return (
      <StyledDrowerBox>
        <StyledBurgerCross onClick={() => setOpenDrower(false)}>
          <CloseIcon color="secondary" />
        </StyledBurgerCross>
        <StyledBurgerUl>
          <li>
            <StyledNavLink to={"/"} onClick={() => setOpenDrower(false)}>
              <StyleldBurgerLogo>Gacheflix</StyleldBurgerLogo>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to={"/"} onClick={() => setOpenDrower(false)}>
              Home
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to={"/movies"} onClick={() => setOpenDrower(false)}>
              Movies
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to={"/tvs"} onClick={() => setOpenDrower(false)}>
              TV Shows
            </StyledNavLink>
          </li>
        </StyledBurgerUl>
        <Button
          variant="outlined"
          sx={{
            marginRight: 2,
            width: "100px",
          }}
        >
          Sign in
        </Button>
      </StyledDrowerBox>
    );
  };

  return (
      <HeaderBox>
        <StyledButtons>
          <Link to={"/"}>
            <StyleldLogo>Gacheflix</StyleldLogo>
          </Link>
          <StyledUl>
            <li>
              <StyledNavLink to={"/movies"}>Movies</StyledNavLink>
            </li>
            <li>
              <StyledNavLink to={"/tvs"}>TV Shows</StyledNavLink>
            </li>
          </StyledUl>
        </StyledButtons>
        <StyledLaptopButtons>
          <StyledBurger onClick={() => setOpenDrower(true)}>
            <MenuIcon color="secondary" sx={{ fontSize: "30px" }} />
          </StyledBurger>
          <Drawer
            open={openDrower}
            anchor={"left"}
            onClose={() => setOpenDrower(false)}
          >
            {getDrowerList()}
          </Drawer>
          <Link to={"/"}>
            <StyleldLogoMedium>Gacheflix</StyleldLogoMedium>
          </Link>
        </StyledLaptopButtons>
        <StyledSerch>
          <TextField
            id="outlined-basic"
            label="Search..."
            value={searchValue}
            variant="outlined"
            size="small"
            sx={{ Width: "200px" }}
            onChange={(e) => serchHandler(e.target.value)}
          />
          <StyledSerchButton
            onClick={() => {
              setSearchValue("");
              setSearchContent([]);
            }}
          >
            <CloseIcon sx={{ fill: "#fff" }} />
          </StyledSerchButton>
          {renderSerchContent()}
          <Button
            variant="outlined"
            sx={{
              marginRight: 2,
              "@media (max-width: 768px)": { display: "none" },
            }}
          >
            Sign in
          </Button>
        </StyledSerch>
      </HeaderBox>
  );
};

export default Header;
