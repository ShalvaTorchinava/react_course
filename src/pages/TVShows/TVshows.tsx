import { Dayjs } from "dayjs";
import { useState, useEffect } from "react";
import { GenresProps, TypeGenres } from "../../types/genres";
import { SerieProps } from "../../types/tvshows";
import {
  StyledBox,
  StyledBoxMovies,
  StyledCards,
  StyledLink,
  StyledNavigation,
} from "./TVShows.styled";
import Skeleton from "@mui/material/Skeleton";
import Error from "../../components/Error/Error";
import MovieCard from "../../components/ContentCard/ContentCard";
import Sorter from "../../components/Sorter/Sorter";
import Filter from "../../components/Filter/Filter";
import { Button} from "@mui/material";
import { MovieProps } from "../../types/movies";
import { seriesCategories } from "../../helpers/sorterValues";
import { SortFiltersProps, CategoriesProps } from "../../types/categores";
import { getSeriesByCatetgories, getSeriesByFilters } from "../../api/api";

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

const TVShows = () => {
  const [series, setSeries] = useState<SerieProps[]>([]);
  const [page, setPage] = useState<number>(1);
  const [selectValue, setSelectValue] = useState<CategoriesProps>(
    seriesCategories[0]
  );
  const [filters, setFilters] = useState<FilterValuesProps | null>(null);
  const [filtersPage, setFiltersPage] = useState<number>(1);
  const [open, setOpen] = useState(false);
  const [pageState, setPageState] = useState(PageState.loading);

  useEffect(() => {
    if (!filters) {
      getSeriesByCatetgories(selectValue, page)
        .then((response) => {
          setSeries([...series, ...response.results]);
          setPageState(PageState.success);
        })
        .catch(() => setPageState(PageState.error));
    }
  }, [page, selectValue, filters]);

  useEffect(() => {
    if (filters) {
      getSeriesByFilters(filters, sortFilters, selectValue)
        .then((response) => {
          setSeries([...series, ...response.results]);
          setPageState(PageState.success);
        })
        .catch((err) => console.error(err))
        .finally(() => setOpen(false));
    }
  }, [filters, filtersPage, selectValue]);

  const clearData = () => {
    return setSeries([]);
  };

  const loadingPage = () => {
    filters ? setFiltersPage(filtersPage + 1) : setPage(page + 1);
  }

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
        {series.map((item: SerieProps) => {
          const contentProps: MovieProps = {
            ...item,
            title: item.name,
            original_title: item.original_name,
            release_date: item.first_air_date,
            video: false,
          };
          return (
            <StyledLink to={item.id.toString()} key={item.id}>
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
            typeGenres={TypeGenres.series}
            setPageState={setPageState}
          />
        </StyledNavigation>
        {renderSeries()}
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

export default TVShows;
