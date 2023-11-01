import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import "swiper/css/effect-fade";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { MovieProps } from "../../types/movies";
import {
  StyledBox,
  StyledIFrame,
  StyledImg,
  StyledSliderBlock,
  StyledSliderDescription,
  StyledSwiper,
  StyledSwiperSlide,
} from "./Slider.styled";
import { useEffect, useState, useCallback } from "react";
import { VideosProps } from "../../types/videos";

interface SliderProps {
  topMovies: MovieProps[];
}

const Slider = ({ topMovies }: SliderProps) => {
  const [videoKey, setVideoKey] = useState<string | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    if (topMovies.length) {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjNmYjVmMjM4MzhlY2QwNjFlNDRmNTAwNmEwNzc4ZCIsInN1YiI6IjY1MzJkMzhlOWFjNTM1MDg3ODZhNDQ5YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LR7cI5OQH0aEBZJJwxYo618dZNY-qzzVDekOxvXAbbs",
        },
      };

      fetch(
        `https://api.themoviedb.org/3/movie/${topMovies[slideIndex].id}/videos?language=en-US`,
        options
      )
        .then((response) => response.json())
        .then((response: VideosProps) => {
          const videoLink = `https://www.youtube.com/embed/${
            response.results[response.results.length - 1].key
          }?autoplay=1&mute=1&controls=0&disablekb=1&loop=1&playlist=${
            response.results[response.results.length - 1].key
          }&start=30`;
          setVideoKey(videoLink);
        })
        .catch((err) => console.error(err));
    }
  }, [topMovies, slideIndex]);

  const renderSliderData = useCallback(
    (item: MovieProps) => {
      if (!videoKey) {
        return (
          <StyledImg
            src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
            alt=""
          />
        );
      }
      return (
        <StyledIFrame
          key={videoKey}
          id="ytplayer"
          width="100%"
          height="100%"
          src={videoKey}
          frameBorder="0"
          allowFullScreen
        />
      );
    },
    [videoKey]
  );

  if (!topMovies) {
    return <h1>Загрузка</h1>;
  }

  return (
    <>
      <StyledBox>
        <StyledSwiper
          cssMode={true}
          navigation={true}
          pagination={true}
          mousewheel={true}
          keyboard={true}
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={(e) => {
            setVideoKey(null);
            setSlideIndex(e.activeIndex);
          }}
        >
          {topMovies.map((item) => {
            return (
              <StyledSwiperSlide key={item.id}>
                {renderSliderData(item)}
                <StyledSliderBlock>
                  <StyledSliderDescription>
                    <h1 style={{fontSize: '36px'}}>{item.title}</h1>
                  </StyledSliderDescription>
                  <div>
                    <Button
                      variant="contained"
                      size="large"
                      sx={{
                        backgroundColor: "#fff",
                        color: "#000000",
                        fontWeight: "bold",
                        "&:hover": { backgroundColor: "#fff" },
                      }}
                    >
                      Go to show
                    </Button>
                  </div>
                </StyledSliderBlock>
              </StyledSwiperSlide>
            );
          })}
        </StyledSwiper>
      </StyledBox>
    </>
  );
};

export default Slider;
