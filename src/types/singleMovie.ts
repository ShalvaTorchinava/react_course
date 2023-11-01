export interface MovieProps {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null | string;
  budget: string;
  genres: GenresProps[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompaniesProps[];
  production_countries: ProductionCountriesProps[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguagesProps[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface GenresProps {
  id: number;
  name: string;
}

export interface ProductionCompaniesProps {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface ProductionCountriesProps {
    iso_3166_1: string;
    name: string;
}

export interface SpokenLanguagesProps {
    english_name: string;
    iso_639_1: string;
    name: string;
}
