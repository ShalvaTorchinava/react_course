import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard/MovieCard";
import styled from "styled-components";
import Select from "react-select";
import { MovieList } from "../types/movieslist";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const StyledNavigation = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  margin-top: 20px;
  width: 100%;
`;

const StyledBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 90vh;
  overflow-y: scroll;
`;

const StyledBoxMovies = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 80%;
`;

const StyledCards = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
`;

const StyledLink = styled(Link)`
  width: calc(100% / 5 - 40px);
`;

interface optionsProps {
  value: string;
  label: string;
}

const options: optionsProps[] = [
  { value: "popular", label: "Popular" },
  { value: "top_rated", label: "Top Rated" },
  { value: "upcoming", label: "Upcoming" },
];

const Movies = () => {
  const [movies, setMovies] = useState<MovieList[] | []>([]);
  const [page, setPage] = useState<number>(1);
  const [selectValue, setSelectValue] = useState<optionsProps>(options[0]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjNmYjVmMjM4MzhlY2QwNjFlNDRmNTAwNmEwNzc4ZCIsInN1YiI6IjY1MzJkMzhlOWFjNTM1MDg3ODZhNDQ5YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LR7cI5OQH0aEBZJJwxYo618dZNY-qzzVDekOxvXAbbs",
      },
    };

    fetch(
      `https://api.themoviedb.org/3/movie/${selectValue.value}?language=en-US&page=${page}`,
      options
    )
      .then((response) => response.json())
      .then((response) => setMovies([...movies, ...response.results]))
      .catch((err) => console.error(err));
  }, [page, selectValue]);

  const renderMovies = () => {
    if (!movies.length) {
      return <h1>Загрузка</h1>;
    }
    return (
      <StyledCards>
        {movies.map((item: MovieList) => {
          return (
            <StyledLink to={item.id.toString()} key={item.id}>
              <MovieCard movie={item} />
            </StyledLink>
          );
        })}
      </StyledCards>
    );
  };

  console.log(movies.filter((item) => item.id === 1139087));

  return (
    <StyledBox>
      <StyledBoxMovies>
        <StyledNavigation>
          <Select
            options={options}
            onChange={(e) => {
              if (selectValue !== e) {
                e && setSelectValue(e);
                setMovies([]);
              }
            }}
            defaultValue={selectValue}
            styles={{
              control: (styles) => ({
                ...styles,
                backgroundColor: "#ffffff",
                borderColor: "unset",
                boxShadow: "unset",
                ":hover": {
                  borderColor: "unset",
                },
              }),
              option: (styles, { isSelected, isFocused }) => {
                return {
                  ...styles,
                  backgroundColor: isSelected
                    ? "#ffffff"
                    : isFocused
                    ? "#ffffff"
                    : undefined,
                  color: isSelected ? "#000000" : undefined,
                  ":active": {
                    ...styles[":active"],
                    backgroundColor: isSelected ? "#ffffff" : undefined,
                  },
                };
              },
            }}
          />
        </StyledNavigation>
        {renderMovies()}
      </StyledBoxMovies>
      <Button
        onClick={() => {
          setPage(page + 1);
        }}
        variant="outlined"
        sx={{
          color: "white",
          borderColor: "white",
          "&:hover": { color: "white", borderColor: "#E50914" },
          marginRight: 2,
          marginBottom: "20px",
          marginTop: "20px",
          width: "500px",
        }}
      >
        More
      </Button>
    </StyledBox>
  );
};

export default Movies;
