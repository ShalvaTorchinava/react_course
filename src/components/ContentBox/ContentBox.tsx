import { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Box, Modal} from "@mui/material";
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
import getRatingColor from "../../helpers/getRatingColor";
import { getContentById, getVideoByContent } from "../../api/api";

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
  const [video, setVideo] = useState<VideoProps[] | []>([]);
  const [pageState, setPageState] = useState(PageState.loading);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getTrailers = () => {
    if (video.length > 0 && video[0].key) {
      const result = video.filter((item) => item.type === "Trailer");
      return result[result.length - 1].key;
    } else return null;
  };

  useEffect(() => {
    if (contentType === ContentType.movies && contentId) {
      getContentById(contentId, "movie")
        .then((response) => {
          response.id ? setMovie(response) : navigate("/notfound");
          setPageState(PageState.success);
        })
        .catch(() => setPageState(PageState.error));
    }
    if (contentType === ContentType.series && contentId) {
      getContentById(contentId, "tv")
        .then((response) => {
          response.id ? setSerie(response) : navigate("/notfound");
          setPageState(PageState.success);
        })
        .catch(() => setPageState(PageState.error));
    }
  }, [movie, serie]);

  useEffect(() => {
    if (contentId) {
      getVideoByContent(contentType, contentId)
        .then((response) => setVideo(response.results))
        .catch((err) => console.error(err));
    }
  }, []);

  const renderTrailersButton = () => {
    if (getTrailers()) {
      return (
        <>
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
        </>
      );
    } else {
      return (
          <Button variant="outlined" disabled>
            No trailer
          </Button>
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
              <StyledContentRating color={getRatingColor(movie, serie)}>
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
