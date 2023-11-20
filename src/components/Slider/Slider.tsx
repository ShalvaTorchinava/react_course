import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import "swiper/css/effect-fade";
import Button from "@mui/material/Button";
import {
  StyledBox,
  StyledIFrame,
  StyledImg,
  StyledSliderBlock,
  StyledSliderDescription,
  StyledSwiper,
  StyledSwiperSlide,
} from "./Slider.styled";
import { useEffect, useState, useCallback, useRef } from "react";
import { VideosPageProps } from "../../types/videos";
import { Link } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { Theme } from "../../helpers/theme";
import { TrendingContentProps } from "../../types/trending";

interface SliderProps {
  topContent: TrendingContentProps[];
}

const Slider = ({ topContent }: SliderProps) => {
  const [videoKey, setVideoKey] = useState<string | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [showBanner, setShowBanner] = useState(1);
  const showBannerTimeOutRef = useRef<number | null>(null);

  useEffect(() => {
    showBannerTimeOutRef.current = setTimeout(() => setShowBanner(0), 5000);
    return () => clearTimeout(showBannerTimeOutRef.current!);
  }, [videoKey]);

  useEffect(() => {
    if (topContent.length) {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjNmYjVmMjM4MzhlY2QwNjFlNDRmNTAwNmEwNzc4ZCIsInN1YiI6IjY1MzJkMzhlOWFjNTM1MDg3ODZhNDQ5YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LR7cI5OQH0aEBZJJwxYo618dZNY-qzzVDekOxvXAbbs",
        },
      };

      fetch(
        `https://api.themoviedb.org/3/movie/${topContent[slideIndex].id}/videos?language=en-US`,
        options
      )
        .then((response) => response.json())
        .then((response: VideosPageProps) => {
          const videoLink = `https://www.youtube.com/embed/${
            response.results[response.results.length - 1].key
          }?autoplay=1&mute=1&controls=0&disablekb=1&loop=1&playlist=${
            response.results[response.results.length - 1].key
          }&start=30`;
          setVideoKey(videoLink);
        })
        .catch((err) => console.log(err));
    }
  }, [topContent, slideIndex]);

  const renderSliderData = useCallback(
    (item: TrendingContentProps) => {
      if (!videoKey) {
        return (
          <StyledImg
            src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
            alt=""
            style={{height: '100%', objectFit: 'cover'}}
          />
        );
      }
      return (
        <>
          <StyledIFrame
            key={videoKey}
            id="ytplayer"
            width="100%"
            height="100%"
            src={videoKey}
            frameBorder="0"
            allowFullScreen
          />
          <StyledImg
            src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
            alt=""
            style={{ position: "absolute", opacity: showBanner, height: '100%', objectFit: 'cover' }}
          />
        </>
      );
    },
    [videoKey, showBanner]
  );

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
          onSlideChange={(e) => {
            setVideoKey(null);
            setSlideIndex(e.activeIndex);
            setShowBanner(1);
          }}
        >
          {topContent.map((item) => {
            return (
              <StyledSwiperSlide key={item.id}>
                {renderSliderData(item)}
                <StyledSliderBlock>
                  <StyledSliderDescription>
                    <h1 style={{ fontSize: "36px" }}>{item.title}</h1>
                  </StyledSliderDescription>
                  <div>
                    <Link to={`${item.media_type}s/${item.id.toString()}`}>
                      <ThemeProvider theme={Theme}>
                        <Button
                          variant="contained"
                          size="medium"
                          sx={{'@media (max-width: 500px)': {fontSize: '10px'}}}
                        >
                          Go to show
                        </Button>
                      </ThemeProvider>
                    </Link>
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
