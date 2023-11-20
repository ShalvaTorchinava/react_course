import { Dayjs } from "dayjs";
import { useState, useEffect } from "react";
import { GenresProps, typeGenres } from "../../types/genres";
import { SerieProps } from "../../types/tvshows";
import {
  StyledBox,
  StyledBoxMovies,
  StyledCards,
  StyledLink,
  StyledNavigation,
} from "./TVshows.styled";
import Skeleton from "@mui/material/Skeleton";
import Error from "../../components/Error/Error";
import MovieCard from "../../components/ContentCard/ContentCard";
import Sorter from "../../components/Sorter/Sorter";
import Filter from "../../components/Filter/Filter";
import { Theme } from "../../helpers/theme";
import { Button, ThemeProvider } from "@mui/material";
import { MovieProps } from "../../types/movies";
import { seriesCategories } from "../../helpers/sortervalues";
import { SortFiltersProps, СategoriesProps } from "../../types/categores";

const sortFilters: SortFiltersProps = {
  popular: "popularity.desc",
  top_rated: "vote_average.desc",
  airing_today: "primary_release_date.desc",
};

export interface FilterValuesProps {
  genres: GenresProps[];
  runtime: number[];
  userScore: number[];
  dateFrom: Dayjs | string | null;
  dateTo: Dayjs | string | null;
}

enum PageState {
  loading = "loading",
  success = "success",
  error = "error",
}

const TVshows = () => {
  const [series, setSeries] = useState<SerieProps[]>([]);
  const [page, setPage] = useState<number>(1);
  const [selectValue, setSelectValue] = useState<СategoriesProps>(
    seriesCategories[0]
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
        `https://api.themoviedb.org/3/tv/${selectValue.value}?language=en-US&page=${page}`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          setSeries([...series, ...response.results]);
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
          .join("%7C")}&with_runtime.gte=${
          filters.runtime[0]
        }&with_runtime.gte=${filters.runtime[0]}&with_runtime.lte=${
          filters.runtime[1]
        }`,
        options
      )
        .then((response) => response.json())
        .then((response) => setSeries([...series, ...response.results]))
        .catch((err) => console.error(err))
        .finally(() => setOpen(false));
    }
  }, [filters, filtersPage, selectValue]);

  const clearData = () => {
    return setSeries([]);
  };

  const renderSeries = () => {
    if (pageState === PageState.loading) {
      return (
        <StyledCards>
          {[...new Array(20)].map((_, index) => {
            return (
              <Skeleton
                sx={{ bgcolor: "grey.900" }}
                animation={false}
                key={index}
                variant="rounded"
                width={"calc(100% / 5 - 40px)"}
                height={330}
              />
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
        {series.map((item: SerieProps, index: number) => {
          const contentProps: MovieProps = {
            ...item,
            title: item.name,
            original_title: item.original_name,
            release_date: item.first_air_date,
            video: false,
          };
          return (
            <StyledLink to={item.id.toString()} key={index}>
              <MovieCard content={contentProps} />
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
            categories={seriesCategories}
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
            typeGenres={typeGenres.series}
            setPageState={setPageState}
          />
        </StyledNavigation>
        {renderSeries()}
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

export default TVshows;
