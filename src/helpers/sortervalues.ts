//название файла некорретно, либо cameCase либо snake_case
import { СategoriesProps, SortFiltersKeys } from "../types/categores";

// проверь глобальное название СategoriesProps, у тебя С русская
export const moviesCategories: СategoriesProps[] = [
  { value: SortFiltersKeys.popular, label: "Popular" },
  { value: SortFiltersKeys.top_rated, label: "Top Rated" },
  { value: SortFiltersKeys.upcoming, label: "Upcoming" },
];

export const seriesCategories: СategoriesProps[] = [
  { value: SortFiltersKeys.popular, label: "Popular" },
  { value: SortFiltersKeys.top_rated, label: "Top Rated" },
  { value: SortFiltersKeys.airing_today, label: "Airing Today" },
];
