import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
  Autoplay,
} from "swiper/modules";
import styled from "styled-components";
import "swiper/css/effect-fade";
import { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const StyledBox = styled.div`
  height: 90vh;
`;

const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: 90vh;
  --swiper-pagination-color: #ffffff;
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  text-align: center;
  font-size: 18px;
  background: #615f5f;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 90vh;
`;

const StyledSliderBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end;
  justify-content: space-between;
  position: absolute;
  padding: 20px;
  width: 100%;
  height: 100%;
  background-color: transparent;
`;

const StyledIFrame = styled.iframe`
  transform: scale(1.5);
`;

const StyledSliderDescription = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: 500;
`;

// .swiper-slide img {
//   display: block;
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
// }

interface MoviesProps {
  page: number;
  results: MovieProps[];
  total_pages: number;
  total_results: number;
}

interface MovieProps {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const Slider = () => {
  const [movies, setMovies] = useState<MoviesProps | null>(null);

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
      "https://api.themoviedb.org/3/trending/all/week?language=en-US",
      options
    )
      .then((response) => response.json())
      .then((response) => setMovies(response))
      .catch((err) => console.error(err));
  }, []);
  // console.log(movies);

  // const topMovies: MovieProps[] | undefined = movies?.results.slice(0, 5);
  // console.log(topMovies);
  const topMovies: MovieProps[] = […movies.results.slice(0,5)]

  if (!movies?.results) {
    console.log("wgearhge");
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
          autoplay={{ delay: 5000 }}
          modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
          className="mySwiper"
        >
          <StyledSwiperSlide>
            <StyledIFrame
              id="ytplayer"
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/2m1drlOZSDw?autoplay=1&mute=1&controls=0&disablekb=1&loop=1&playlist=2m1drlOZSDw&start=30"
              frameBorder="0"
              allowFullScreen
            />
            <StyledSliderBlock>
              <StyledSliderDescription>
                <h1>[Mission: Impossible - Dead Reckoning Part One]</h1>
                <Stack spacing={1}>
                  <Rating
                    name="half-rating-read"
                    defaultValue={3}
                    precision={0.5}
                    size="large"
                    sx={{ borderColor: "#fff" }}
                    readOnly
                  />
                </Stack>
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
        </StyledSwiper>
      </StyledBox>
    </>
  );
};

export default Slider;
