import { useEffect, useState } from "react";
import MovieCard from "../../components/ContentCard/ContentCard";
import { Button } from "@mui/material";
import { Theme } from "../../helpers/theme";
import { GenresProps, TypeGenres } from "../../types/genres";
import { Dayjs } from "dayjs";
import Skeleton from "@mui/material/Skeleton";
import Sorter from "../../components/Sorter/Sorter";
import { MovieProps } from "../../types/movies";
import Filter from "../../components/Filter/Filter";
import Error from "../../components/Error/Error";
import { SortFiltersProps, CategoriesProps } from "../../types/categores";
import {
  SkeletonCards,
  StyledBox,
  StyledBoxMovies,
  StyledCards,
  StyledLink,
  StyledNavigation,
} from "./Movies.styled";
import { moviesCategories } from "../../helpers/sorterValues";
import { getMoviesByCategories, getMoviesByFilters } from "../../api/api";

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
  const [selectValue, setSelectValue] = useState<CategoriesProps>(
    moviesCategories[0]
  );
  const [filters, setFilters] = useState<FilterValuesProps | null>(null);
  const [filtersPage, setFiltersPage] = useState<number>(1);
  const [open, setOpen] = useState(false);
  const [pageState, setPageState] = useState(PageState.loading);

  useEffect(() => {
    if (!filters) {
      getMoviesByCategories(selectValue, page)
        .then((response) => {
          setMovies([...movies, ...response.results]);
          setPageState(PageState.success);
        })
        .catch(() => setPageState(PageState.error));
    }
  }, [page, selectValue, filters]);

  useEffect(() => {
    if (filters) {
      getMoviesByFilters(filtersPage, filters, sortFilters, selectValue)
        .then((response) => setMovies([...movies, ...response.results]))
        .catch((err) => console.error(err))
        .finally(() => {
          setOpen(false);
          setPageState(PageState.success);
        });
    }
  }, [filters, filtersPage, selectValue]);

  const clearData = () => {
    return setMovies([]);
  };

  const loadingPage = () => {
    filters ? setFiltersPage(filtersPage + 1) : setPage(page + 1);
  }

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
        {movies.map((item: MovieProps) => {
          return (
            <StyledLink to={item.id.toString()} key={item.id}>
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
            typeGenres={TypeGenres.movies}
            setPageState={setPageState}
          />
        </StyledNavigation>
        {renderMovies()}
      </StyledBoxMovies>
      {pageState === PageState.success && (
          <Button
            onClick={() => loadingPage()}
            variant="outlined"
            sx={{
              marginBottom: "20px",
              marginTop: "20px",
              width: "80%",
            }}
          >
            More
          </Button>
      )}
    </StyledBox>
  );
};

export default Movies;
