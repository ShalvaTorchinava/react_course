export interface CategoriesProps {
  value: SortFiltersKeys;
  label: string;
}

export enum SortFiltersKeys {
  popular = "popular",
  top_rated = "top_rated",
  upcoming = "upcoming",
  airing_today = "airing_today",
}

export interface SortFiltersProps {
  [SortFiltersKeys.popular]: string;
  [SortFiltersKeys.top_rated]: string;
  [SortFiltersKeys.airing_today]?: string;
  [SortFiltersKeys.upcoming]?: string;
}
