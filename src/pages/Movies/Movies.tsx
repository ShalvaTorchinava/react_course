import { useEffect, useState } from "react";
import MovieCard from "../../components/ContentCard/ContentCard";
import { Button, ThemeProvider } from "@mui/material";
import { Theme } from "../../helpers/theme";
import { GenresProps, typeGenres } from "../../types/genres";
import { Dayjs } from "dayjs";
import Skeleton from "@mui/material/Skeleton";
import Sorter from "../../components/Sorter/Sorter";
import { MovieProps } from "../../types/movies";
import Filter from "../../components/Filter/Filter";
import Error from "../../components/Error/Error";
import { SortFiltersProps, СategoriesProps } from "../../types/categores";
import {
  SkeletonCards,
  StyledBox,
  StyledBoxMovies,
  StyledCards,
  StyledLink,
  StyledNavigation,
} from "./Movies.styled";
import { moviesCategories } from "../../helpers/sortervalues";

const sortFilters: SortFiltersProps = {
  popular: "popularity.desc",
  top_rated: "vote_average.desc",
  upcoming: "primary_release_date.desc",
};

export interface FilterValuesProps {
  genres: GenresProps[];
  runtime: number[];
  userScore: number[];
  dateFrom: Dayjs | string | null;
  dateTo: Dayjs | string | null;
}

export enum PageState {
  loading = "loading",
  success = "success",
  error = "error",
}

const Movies = () => {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [page, setPage] = useState<number>(1);
  const [selectValue, setSelectValue] = useState<СategoriesProps>(
    moviesCategories[0]
  );
  const [filters, setFilters] = useState<FilterValuesProps | null>(null);
  const [filtersPage, setFiltersPage] = useState<number>(1);
  const [open, setOpen] = useState(false);
  const [pageState, setPageState] = useState(PageState.loading);

  useEffect(() => {
    if (!filters) {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjNmYjVmMjM4MzhlY2QwNjFlNDRmNTAwNmEwNzc4ZCIsInN1YiI6IjY1MzJkMzhlOWFjNTM1MDg3ODZhNDQ5YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LR7cI5OQH0aEBZJJwxYo618dZNY-qzzVDekOxvXAbbs",
        },
      };

      fetch(
        `https://api.themoviedb.org/3/movie/${selectValue.value}?language=en-US&page=${page}`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          setMovies([...movies, ...response.results]);
          setPageState(PageState.success);
        })
        .catch(() => setPageState(PageState.error));
    }
  }, [page, selectValue, filters]);

  useEffect(() => {
    if (filters) {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjNmYjVmMjM4MzhlY2QwNjFlNDRmNTAwNmEwNzc4ZCIsInN1YiI6IjY1MzJkMzhlOWFjNTM1MDg3ODZhNDQ5YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LR7cI5OQH0aEBZJJwxYo618dZNY-qzzVDekOxvXAbbs",
        },
      };

      fetch(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${filtersPage}&primary_release_date.gte=${
          filters.dateFrom
        }&primary_release_date.lte=${filters.dateTo}&sort_by=${
          sortFilters[selectValue.value]
        }&vote_average.gte=${filters.userScore[0]}&vote_average.lte=${
          filters.userScore[1]
        }&with_genres=${filters.genres
          .map((item) => item.id)
          .join("%7C")}&with_runtime.gte=${
          filters.runtime[0]
        }&with_runtime.lte=${filters.runtime[1]}`,
        options
      )
        .then((response) => response.json())
        .then((response) => setMovies([...movies, ...response.results]))
        .catch((err) => console.error(err))
        .finally(() => {
          setOpen(false);
          setPageState(PageState.success)
        });
    }
  }, [filters, filtersPage, selectValue]);

  const clearData = () => {
    return setMovies([]);
  };

  const renderMovies = () => {
    if (pageState === PageState.loading) {
      return (
        <StyledCards>
          {[...new Array(20)].map((_, index) => {
            return (
              <SkeletonCards key={index}>
                <Skeleton
                  sx={{ bgcolor: "grey.900" }}
                  animation={false}
                  variant="rounded"
                  width={"100%"}
                  height={"100%"}
                />
              </SkeletonCards>
            );
          })}
        </StyledCards>
      );
    }
    if (pageState === PageState.error) {
      return <Error />;
    }
    return (
      <StyledCards>
        {movies.map((item: MovieProps, index: number) => {
          return (
            <StyledLink to={item.id.toString()} key={index}>
              <MovieCard content={item} />
            </StyledLink>
          );
        })}
      </StyledCards>
    );
  };

  return (
    <StyledBox>
      <StyledBoxMovies>
        <StyledNavigation>
          <Sorter
            categories={moviesCategories}
            selectValue={selectValue}
            setSelectValue={setSelectValue}
            clearData={clearData}
            page={page}
            setPage={setPage}
            filtersPage={filtersPage}
            setFiltersPage={setFiltersPage}
            setPageState={setPageState}
          />
          <Filter
            filters={filters}
            setFilters={setFilters}
            clearData={clearData}
            setPage={setPage}
            setFiltersPage={setFiltersPage}
            open={open}
            setOpen={setOpen}
            typeGenres={typeGenres.movies}
            setPageState={setPageState}
          />
        </StyledNavigation>
        {renderMovies()}
      </StyledBoxMovies>
      {pageState === PageState.success && (
        <ThemeProvider theme={Theme}>
          <Button
            onClick={() => {
              filters ? setFiltersPage(filtersPage + 1) : setPage(page + 1);
            }}
            variant="outlined"
            sx={{
              marginBottom: "20px",
              marginTop: "20px",
              width: "80%",
            }}
          >
            More
          </Button>
        </ThemeProvider>
      )}
    </StyledBox>
  );
};

export default Movies;
