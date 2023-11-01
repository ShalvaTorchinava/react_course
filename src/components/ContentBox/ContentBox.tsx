import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { MovieProps } from "../../types/singleMovie";

const StyledBackground = styled.img`
  position: absolute;
  width: 100%;
  z-index: -1;
  filter: brightness(0.08);
`;

const StyledBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 90vh;
  color: white;
`;

const StyledContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
  width: 80%;
  height: 80%;
`;

const StyledContentPoster = styled.img`
  border: 3px solid #454545;
`;

const StyledContentTitle = styled.div`
  font-size: 48px;
  font-weight: 700;
  text-transform: uppercase;
`;

const StyledContentData = styled.div`
  font-size: 24px;
  font-weight: 500;
  color: #9b9b9b;
`;

const StyledContentButtons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 40px 0px;
  gap: 20px;
`;

const StyledContentRating = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid #d3af37;
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

const StyledContentButton = styled.button`
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

const StyledContentDescription = styled.div`
  font-size: 18px;
  line-height: 1.8;
  margin-bottom: 20px;
`;

interface ContentBoxProps {
  movieId: string | undefined;
}

const ContentBox = ({ movieId }: ContentBoxProps) => {
  
  const [movie, setMovie] = useState<MovieProps | null>(null)
  
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjNmYjVmMjM4MzhlY2QwNjFlNDRmNTAwNmEwNzc4ZCIsInN1YiI6IjY1MzJkMzhlOWFjNTM1MDg3ODZhNDQ5YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LR7cI5OQH0aEBZJJwxYo618dZNY-qzzVDekOxvXAbbs",
      },
    };

    fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options)
      .then((response) => response.json())
      .then((response) => setMovie(response))
      .catch((err) => console.error(err));
  }, []);

  if(!movie) {
    return <h1>Загрузка</h1>
  }

  return (
    <section>
      <StyledBackground
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt=""
      />
      <StyledBox>
        <StyledContent>
          <StyledContentPoster
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt=""
          />
          <div>
            <StyledContentTitle>{movie.title}</StyledContentTitle>
            <StyledContentData>{movie.release_date}</StyledContentData>
            <StyledContentButtons>
              <StyledContentRating>{+movie.vote_average.toFixed(1) * 10}%</StyledContentRating>
              <StyledContentButton>
                <FavoriteIcon sx={{ fill: "#fff" }} />
              </StyledContentButton>
              <StyledContentButton>
                <AddIcon sx={{ fill: "#fff", scale: "1.4" }} />
              </StyledContentButton>
            </StyledContentButtons>
            <StyledContentDescription>{movie.overview}</StyledContentDescription>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#e50914",
                "&:hover": { backgroundColor: "#e50914" },
              }}
            >
              Play trailer
            </Button>
          </div>
        </StyledContent>
      </StyledBox>
    </section>
  );
};

export default ContentBox;
