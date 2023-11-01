import React, { useEffect, useState } from "react";
import Slider from "../components/Slider/Slider";
import { MovieProps, MoviesProps } from "../types/movies";



const Home = () => {
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
  
    const getTopMovies = (): MovieProps[] => {
      if (!movies?.results) {
        return [];
      }
      return movies.results
        .filter((item) => item.title && item.vote_average && item.backdrop_path)
        .slice(0, 5);
    };

  return (
    <>
      <Slider topMovies={getTopMovies()} />
    </>
  );
};

export default Home;
