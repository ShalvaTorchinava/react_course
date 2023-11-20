import { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
// удаляем не используемые импорты
import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import { Box, Modal, ThemeProvider } from "@mui/material";
import { Theme } from "../../helpers/theme";
import { MovieDetailsProps } from "../../types/movies";
import { VideoProps } from "../../types/videos";
import {
  StyledBackground,
  StyledBox,
  StyledContentButton,
  StyledContentButtons,
  StyledContentData,
  StyledContentDescription,
  StyledContentGenres,
  StyledContentImage,
  StyledContentInfo,
  StyledContentNoPoster,
  StyledContentPoster,
  StyledContentRating,
  StyledContentTitle,
  style,
} from "./ContentBox.styled";
import Error from "../Error/Error";
import SkeletonContentBox from "./SkeletonContentBox";
import { SerieDetailsProps } from "../../types/tvshows";

interface ContentBoxProps {
  contentId: string | undefined;
  contentType: ContentType;
}

enum PageState {
  loading = "loading",
  success = "success",
  error = "error",
}

export enum ContentType {
  movies = "movie",
  series = "tv",
}

const ContentBox = ({ contentId, contentType }: ContentBoxProps) => {
  const [movie, setMovie] = useState<MovieDetailsProps | null>(null);
  const [serie, setSerie] = useState<SerieDetailsProps | null>(null);
  // Если у тебя массив заходит в useState - дефолтное значение его пустой массив вместо null
  const [video, setVideo] = useState<VideoProps[] | null>(null);
  const [pageState, setPageState] = useState(PageState.loading);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getTrailers = () => {
    if (video?.length && video[0].key) {
      const result = video.filter((item) => item.type === "Trailer");
      return result[result.length - 1].key;
    } else return null;
  };

  const ratingColor = () => {
    // это надо вынести в helpers функцию
    if (movie) {
      const value = +movie.vote_average.toFixed(1) * 10;
      if (value === 0) {
        return "#494949";
      }
      if (value <= 30) {
        return "#d11313";
      }
      if (value <= 50) {
        return "#d15f13";
      }
      if (value <= 75) {
        return "#d1ab13";
      }
      if (value <= 100) {
        return `#13d116`;
      }
    } else if (serie) {
      const value = +serie.vote_average.toFixed(1) * 10;
      if (value === 0) {
        return "#494949";
      }
      if (value <= 30) {
        return "#d11313";
      }
      if (value <= 50) {
        return "#d15f13";
      }
      if (value <= 75) {
        return "#d1ab13";
      }
      if (value <= 100) {
        return `#13d116`;
      }
    } else {
      return "#494949";
    }
  };

  useEffect(() => {
    if (contentType === ContentType.movies) {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjNmYjVmMjM4MzhlY2QwNjFlNDRmNTAwNmEwNzc4ZCIsInN1YiI6IjY1MzJkMzhlOWFjNTM1MDg3ODZhNDQ5YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LR7cI5OQH0aEBZJJwxYo618dZNY-qzzVDekOxvXAbbs",
        },
      };

      fetch(
        `https://api.themoviedb.org/3/movie/${contentId}?language=en-US`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          response.id ? setMovie(response) : navigate("/notfound");
          setPageState(PageState.success);
        })
        .catch(() => setPageState(PageState.error));
    }
    if (contentType === ContentType.series) {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjNmYjVmMjM4MzhlY2QwNjFlNDRmNTAwNmEwNzc4ZCIsInN1YiI6IjY1MzJkMzhlOWFjNTM1MDg3ODZhNDQ5YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LR7cI5OQH0aEBZJJwxYo618dZNY-qzzVDekOxvXAbbs",
        },
      };

      fetch(
        `https://api.themoviedb.org/3/tv/${contentId}?language=en-US`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          response.id ? setSerie(response) : navigate("/notfound");
          setPageState(PageState.success);
        })
        .catch(() => setPageState(PageState.error));
    }
  }, [movie, serie]);

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
      `https://api.themoviedb.org/3/${contentType}/${contentId}/videos?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) => setVideo(response.results))
      .catch((err) => console.error(err));
  }, []);

  const renderTrailersButton = () => {
    if (getTrailers()) {
      return (
        <>
          <ThemeProvider theme={Theme}>
            <Button
              onClick={handleOpen}
              variant="contained"
              sx={{ marginBottom: "10px" }}
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
          </ThemeProvider>
        </>
      );
    } else {
      return (
        <ThemeProvider theme={Theme}>
          <Button variant="outlined" disabled>
            No trailer
          </Button>
        </ThemeProvider>
      );
    }
  };

  const getContentProps = () => {
    const isMovie = contentType === ContentType.movies && movie;
    return {
      backdrop_path: isMovie ? movie.backdrop_path : serie!.backdrop_path,
      poster_path: isMovie ? movie.poster_path : serie!.poster_path,
      title: isMovie ? movie.title : serie!.name,
      release_date: isMovie ? movie.release_date : serie!.first_air_date,
      genres: isMovie ? movie.genres : serie!.genres,
      vote_average: isMovie ? movie.vote_average : serie!.vote_average,
      overview: isMovie ? movie.overview : serie!.overview,
    };
  };

  const renderContent = () => {
    const data = getContentProps();
    return (
      <section>
        <StyledBackground
          src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
          alt=""
          style={{ height: "100%", objectFit: "cover" }}
        />
        <StyledBox>
          <StyledContentImage>
            {data.poster_path ? (
              <StyledContentPoster
                src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                alt=""
              />
            ) : (
              <StyledContentNoPoster>Gacheflix</StyledContentNoPoster>
            )}
          </StyledContentImage>
          <StyledContentInfo>
            <StyledContentTitle>{data.title}</StyledContentTitle>
            <StyledContentData>{data.release_date}</StyledContentData>
            <StyledContentGenres>
              {data.genres.map((item) => item.name).join(", ")}
            </StyledContentGenres>
            <StyledContentButtons>
              <StyledContentRating color={ratingColor()}>
                {data.vote_average === 0
                  ? "NR"
                  : +data.vote_average.toFixed(1) * 10 + "%"}
              </StyledContentRating>
              <StyledContentButton>
                <FavoriteIcon sx={{ fill: "#fff" }} />
              </StyledContentButton>
              <StyledContentButton>
                <AddIcon sx={{ fill: "#fff", scale: "1.4" }} />
              </StyledContentButton>
            </StyledContentButtons>
            <StyledContentDescription>{data.overview}</StyledContentDescription>
            {renderTrailersButton()}
          </StyledContentInfo>
        </StyledBox>
      </section>
    );
  };

  if (pageState === PageState.loading) {
    return <SkeletonContentBox />;
  }
  if (pageState === PageState.error) {
    return <Error />;
  }

  return renderContent();
};

export default ContentBox;
