import { useEffect, useState } from "react";
import Slider from "../components/Slider/Slider";
import { TrendingContentProps } from "../types/trending";
import Background from "../assets/gacheflix_background.png";
import styled from "styled-components";
import Error from "../components/Error/Error";

const BackgroundImg = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
`;

enum PageState {
  loading = "loading",
  success = "success",
  error = "error",
}

const Home = () => {
  const [trendingContent, setTrendingContent] = useState<
    TrendingContentProps[] | null
  >(null);
  const [pageState, setPageState] = useState(PageState.loading);

  useEffect(() => {
    // Ты достаточно часто используешь options - ты можешь вынести это в helpers и импортировать оттуда
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjNmYjVmMjM4MzhlY2QwNjFlNDRmNTAwNmEwNzc4ZCIsInN1YiI6IjY1MzJkMzhlOWFjNTM1MDg3ODZhNDQ5YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LR7cI5OQH0aEBZJJwxYo618dZNY-qzzVDekOxvXAbbs",
      },
    };
    // Также ты можешь создать папку api и вынести туда все запросы как функции (глобально)
    // типа:
    // const getTrendingContent = async () => {
    //   return await fetch(
    //       "https://api.themoviedb.org/3/trending/all/week?language=en-US",
    //       options
    //   )
    //       .then((response) => response.json())
    // }

    // и тут будет что-то типа
    // await getTrendingContent().then((response) => {
    //   setTrendingContent(response.results);
    //   setPageState(PageState.success);
    // })
    //     .catch(() => setPageState(PageState.error));
    fetch(
      "https://api.themoviedb.org/3/trending/all/week?language=en-US",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setTrendingContent(response.results);
        setPageState(PageState.success);
      })
      .catch(() => setPageState(PageState.error));
  }, []);

  const getTopContent = (): TrendingContentProps[] => {
    if (!trendingContent) {
      return [];
    }
    return trendingContent
      .filter((item) => item.title && item.vote_average && item.backdrop_path)
      .slice(0, 5);
  };

  if (pageState === PageState.loading) {
    return (
      <>
        <BackgroundImg src={Background} alt="" />
      </>
    );
  }

  if (pageState === PageState.error) {
    return <Error />;
  }

  return (
    <>
      <Slider topContent={getTopContent()} />
    </>
  );
};

export default Home;
