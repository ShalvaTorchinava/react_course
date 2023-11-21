import { useEffect, useState } from "react";
import Slider from "../components/Slider/Slider";
import { TrendingContentProps } from "../types/trending";
import Background from "../assets/gacheflix_background.png";
import styled from "styled-components";
import Error from "../components/Error/Error";
import { getTrendingContent } from "../api/api";

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
    TrendingContentProps[] | []
  >([]);
  const [pageState, setPageState] = useState(PageState.loading);

  useEffect(() => {
    getTrendingContent()
      .then((response) => {
        setTrendingContent(response.results);
        setPageState(PageState.success);
      })
      .catch(() => setPageState(PageState.error));
  }, []);

  const getTopContent = (): TrendingContentProps[] => {
    if (trendingContent.length === 0) {
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
