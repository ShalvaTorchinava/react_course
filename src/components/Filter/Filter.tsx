import { useEffect, useState } from "react";
import {
  StyledCloseIcon,
  StyledFilterBlock,
  StyledFilterButtons,
  StyledFilterOpen,
  StyledForm,
  Styledlabel,
  style,
} from "./Filter.styled";
import FilterListIcon from "@mui/icons-material/FilterList";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Modal,
  Slider,
  TextField,
  ThemeProvider,
} from "@mui/material";
import { Theme } from "../../helpers/theme";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { FormikErrors, useFormik } from "formik";
import { GenresProps, typeGenres } from "../../types/genres";
import { FilterValuesProps, PageState } from "../../pages/Movies/Movies";

interface FilterProps {
  filters: FilterValuesProps | null;
  setFilters(filters: FilterValuesProps | null): void;
  clearData: () => void;
  setPage(page: number): void;
  setFiltersPage(filtersPage: number): void;
  open: boolean;
  setOpen(open: boolean): void;
  typeGenres: typeGenres
  setPageState(pageState: PageState): void
}

const Filter = ({
  filters,
  setFilters,
  clearData,
  setFiltersPage,
  setPage,
  open,
  setOpen,
  typeGenres, 
  setPageState
}: FilterProps) => {
  const [genres, setGenres] = useState<GenresProps[]>([]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjNmYjVmMjM4MzhlY2QwNjFlNDRmNTAwNmEwNzc4ZCIsInN1YiI6IjY1MzJkMzhlOWFjNTM1MDg3ODZhNDQ5YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LR7cI5OQH0aEBZJJwxYo618dZNY-qzzVDekOxvXAbbs",
      },
    };

    fetch(`https://api.themoviedb.org/3/genre/${typeGenres}/list?language=en`, options)
      .then((response) => response.json())
      .then((response) => setGenres(response.genres))
      .catch((err) => console.error(err));
  }, []);

  const formik = useFormik<FilterValuesProps>({
    initialValues: {
      genres: [],
      runtime: [0, 400],
      userScore: [0, 10],
      dateFrom: null,
      dateTo: null,
    },
    onSubmit: (filterValues) => {
      if (!filterValues.dateFrom) {
        filterValues.dateFrom = "";
      }
      if (!filterValues.dateTo) {
        filterValues.dateTo = "";
      }
      setPageState(PageState.loading)
      clearData();
      setPage(1);
      setFilters(filterValues);
      localStorage.setItem('filters', JSON.stringify(filterValues))
    },
    validate: (filterValues) => {
      const errors: FormikErrors<FilterValuesProps> = {};
      if (
        filterValues.dateFrom &&
        filterValues.dateTo &&
        filterValues.dateFrom > filterValues.dateTo
      ) {
        errors.dateFrom = "Incorrect date";
      }
      return errors;
    },
  });

  return (
    <>
      <StyledFilterOpen onClick={() => setOpen(true)}>
        <FilterListIcon
          sx={{ fontSize: "36px", fill: `${filters ? "#e50914" : "#fff"}` }}
        />
      </StyledFilterOpen>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <StyledForm onSubmit={formik.handleSubmit}>
            <ThemeProvider theme={Theme}>
              <StyledCloseIcon
                onClick={() => setOpen(false)}
                sx={{ fill: "#fff" }}
              />
              <StyledFilterBlock>
                <Styledlabel>Choose genres:</Styledlabel>
                <Autocomplete
                  multiple
                  id="genres"
                  size="small"
                  options={genres}
                  value={formik.values.genres}
                  getOptionLabel={(option) => option.name}
                  filterSelectedOptions
                  onChange={(_e, value) =>
                    formik.setFieldValue("genres", value)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Genres"
                      placeholder="Select..."
                    />
                  )}
                />
              </StyledFilterBlock>
              <StyledFilterBlock>
                <Styledlabel>Runtime:</Styledlabel>
                <Slider
                  name="runtime"
                  value={formik.values.runtime}
                  defaultValue={formik.initialValues.runtime}
                  step={20}
                  marks
                  min={0}
                  max={400}
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                  valueLabelDisplay="auto"
                />
              </StyledFilterBlock>
              <StyledFilterBlock>
                <Styledlabel>User Score:</Styledlabel>
                <Slider
                  value={formik.values.userScore}
                  defaultValue={formik.initialValues.userScore}
                  name="userScore"
                  step={1}
                  marks
                  min={0}
                  max={10}
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                  valueLabelDisplay="auto"
                />
              </StyledFilterBlock>
              <StyledFilterBlock>
                <Styledlabel>Release Dates:</Styledlabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    components={["DatePicker", "DatePicker"]}
                    sx={{ width: "100%", justifyContent: "space-between" }}
                  >
                    <DatePicker
                      label="from"
                      value={
                        filters?.dateFrom
                          ? dayjs(formik.values.dateFrom)
                          : formik.initialValues.dateFrom
                      }
                      format="DD/MM/YYYY"
                      onChange={(value) =>
                        formik.setFieldValue(
                          "dateFrom",
                          dayjs(value).format("YYYY-MM-DD")
                        )
                      }
                    />
                    <DatePicker
                      label="to"
                      value={
                        filters?.dateTo
                          ? dayjs(formik.values.dateTo)
                          : formik.initialValues.dateTo
                      }
                      format="DD/MM/YYYY"
                      onChange={(value) =>
                        formik.setFieldValue(
                          "dateTo",
                          dayjs(value).format("YYYY-MM-DD")
                        )
                      }
                    />
                  </DemoContainer>
                </LocalizationProvider>
                {formik.errors.dateFrom ? (
                  <Alert severity="error">{formik.errors.dateFrom}</Alert>
                ) : null}
              </StyledFilterBlock>
              <StyledFilterButtons>
                <Button
                  variant="contained"
                  type="submit"
                  color="secondary"
                  sx={{ width: "100px" }}
                >
                  Accept
                </Button>
                <Button
                  variant="contained"
                  disabled={filters ? false : true}
                  color="secondary"
                  sx={{ width: "100px" }}
                  onClick={() => {
                    if (filters) {   
                      setPageState(PageState.loading)
                      clearData();
                      setFilters(null);
                      setFiltersPage(1);
                      formik.resetForm();
                    }
                  }}
                >
                  Reset
                </Button>
              </StyledFilterButtons>
            </ThemeProvider>
          </StyledForm>
        </Box>
      </Modal>
    </>
  );
};

export default Filter;
