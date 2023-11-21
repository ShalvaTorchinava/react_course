import { ContentType } from "../components/ContentBox/ContentBox";
import { FilterValuesProps } from "../pages/Movies/Movies";
import { CategoriesProps, SortFiltersProps } from "../types/categores";
import { TypeGenres } from "../types/genres";
import { TrendingContentProps } from "../types/trending";

const GetOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjNmYjVmMjM4MzhlY2QwNjFlNDRmNTAwNmEwNzc4ZCIsInN1YiI6IjY1MzJkMzhlOWFjNTM1MDg3ODZhNDQ5YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LR7cI5OQH0aEBZJJwxYo618dZNY-qzzVDekOxvXAbbs",
  },
};

export const getContentById = async (
  contentId: string,
  contentType: string
) => {
  return await fetch(
    `https://api.themoviedb.org/3/${contentType}/${contentId}?language=en-US`,
    GetOptions
  ).then((response) => response.json());
};

export const getVideoByContent = async (
  contentType: ContentType,
  contentId: string
) => {
  return await fetch(
    `https://api.themoviedb.org/3/${contentType}/${contentId}/videos?language=en-US`,
    GetOptions
  ).then((response) => response.json());
};

export const getGenresByType = async (typeGenres: TypeGenres) => {
  return await fetch(
    `https://api.themoviedb.org/3/genre/${typeGenres}/list?language=en`,
    GetOptions
  ).then((response) => response.json());
};

export const getSearchContent = async (searchValue: string, page: number) => {
  return await fetch(
    `https://api.themoviedb.org/3/search/multi?query=${searchValue}&include_adult=false&language=en-US&page=${page}`,
    GetOptions
  ).then((response) => response.json());
};

export const getSliderContent = async (
  topContent: TrendingContentProps[],
  slideIndex: number
) => {
  return await fetch(
    `https://api.themoviedb.org/3/movie/${topContent[slideIndex].id}/videos?language=en-US`,
    GetOptions
  ).then((response) => response.json());
};

export const getMoviesByCategories = async (
  selectValue: CategoriesProps,
  page: number
) => {
  return await fetch(
    `https://api.themoviedb.org/3/movie/${selectValue.value}?language=en-US&page=${page}`,
    GetOptions
  ).then((response) => response.json());
};

export const getSeriesByCatetgories = async (
  selectValue: CategoriesProps,
  page: number
) => {
  return await fetch(
    `https://api.themoviedb.org/3/tv/${selectValue.value}?language=en-US&page=${page}`,
    GetOptions
  ).then((response) => response.json());
};

export const getMoviesByFilters = async (
  filtersPage: number,
  filters: FilterValuesProps,
  sortFilters: SortFiltersProps,
  selectValue: CategoriesProps
) => {
  return await fetch(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${filtersPage}&primary_release_date.gte=${
      filters.dateFrom
    }&primary_release_date.lte=${filters.dateTo}&sort_by=${
      sortFilters[selectValue.value]
    }&vote_average.gte=${filters.userScore[0]}&vote_average.lte=${
      filters.userScore[1]
    }&with_genres=${filters.genres
      .map((item) => item.id)
      .join("%7C")}&with_runtime.gte=${filters.runtime[0]}&with_runtime.lte=${
      filters.runtime[1]
    }`,
    GetOptions
  ).then((response) => response.json());
};

export const getSeriesByFilters = async (
  filters: FilterValuesProps,
  sortFilters: SortFiltersProps,
  selectValue: CategoriesProps
) => {
  return await fetch(
    `https://api.themoviedb.org/3/discover/tv?first_air_date.gte=${
      filters.dateFrom
    }&first_air_date.lte=${
      filters.dateTo
    }&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=${
      sortFilters[selectValue.value]
    }&vote_average.gte=${filters.userScore[0]}&vote_average.lte=${
      filters.userScore[1]
    }&with_genres=${filters.genres
      .map((item) => item.id)
      .join("%7C")}&with_runtime.gte=${filters.runtime[0]}&with_runtime.gte=${
      filters.runtime[0]
    }&with_runtime.lte=${filters.runtime[1]}`,
    GetOptions
  ).then((response) => response.json());
};

export const getTrendingContent = async () => {
  return await fetch(
    "https://api.themoviedb.org/3/trending/all/week?language=en-US",
    GetOptions
  ).then((response) => response.json());
};
