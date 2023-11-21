import { SortFiltersKeys, CategoriesProps } from "../types/categores";

export const moviesCategories: CategoriesProps[] = [
  { value: SortFiltersKeys.popular, label: "Popular" },
  { value: SortFiltersKeys.top_rated, label: "Top Rated" },
  { value: SortFiltersKeys.upcoming, label: "Upcoming" },
];

export const seriesCategories: CategoriesProps[] = [
  { value: SortFiltersKeys.popular, label: "Popular" },
  { value: SortFiltersKeys.top_rated, label: "Top Rated" },
  { value: SortFiltersKeys.airing_today, label: "Airing Today" },
];
