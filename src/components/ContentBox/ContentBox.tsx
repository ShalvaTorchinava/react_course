import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { MovieProps, VideoProps } from "../../types/singleMovie";
import { redirect, useNavigate } from "react-router-dom";
import { Box, Modal } from "@mui/material";

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

const StyledContentGenres = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #9b9b9b;
  text-transform: uppercase;
  margin-top: 15px;
`;

const style = {
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

interface ContentBoxProps {
  movieId: string | undefined;
}

const ContentBox = ({ movieId }: ContentBoxProps) => {
  const [movie, setMovie] = useState<MovieProps | null>(null);
  const [video, setVideo] = useState<VideoProps[] | null>(null);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const getTrailers = () => {
    if (video?.length && video[0].key) {
      const result = video.filter((item) => item.type === "Trailer");
      return result[result.length - 1].key;
    } else return null;
  };

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
      `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        response.id ? setMovie(response) : navigate("/notfound");
      })
      .catch((err) => console.error(err));
  }, []);

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
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) => setVideo(response.results))
      .catch((err) => console.error(err));
  }, []);

  const renderButton = () => {
    if (getTrailers()) {
      return (
        <>
          <Button
            onClick={handleOpen}
            variant="contained"
            sx={{
              backgroundColor: "#e50914",
              "&:hover": { backgroundColor: "#e50914" },
            }}
          >
            Play trailer
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${getTrailers()}?si=uG1fKv0Wdmmi2mQ_`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </Box>
          </Modal>
        </>
      );
    } else {
      return (
        <Button
          variant="outlined"
          disabled
          sx={{
            backgroundColor: "#464646"
          }}
        >
          Play trailer
        </Button>
      );
    }
  };

  if (!movie?.id) {
    return <h1>Загрузка</h1>;
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
            <StyledContentGenres>
              {movie.genres.map((item) => item.name).join(", ")}
            </StyledContentGenres>
            <StyledContentButtons>
              <StyledContentRating>
                {+movie.vote_average.toFixed(1) * 10}%
              </StyledContentRating>
              <StyledContentButton>
                <FavoriteIcon sx={{ fill: "#fff" }} />
              </StyledContentButton>
              <StyledContentButton>
                <AddIcon sx={{ fill: "#fff", scale: "1.4" }} />
              </StyledContentButton>
            </StyledContentButtons>
            <StyledContentDescription>
              {movie.overview}
            </StyledContentDescription>
            {renderButton()}
          </div>
        </StyledContent>
      </StyledBox>
    </section>
  );
};

export default ContentBox;
