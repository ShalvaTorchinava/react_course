import { GenresProps } from "./genres"

export interface SeriesPageProps {
    page: number,
    results: SerieProps[], 
    total_pages: number,
    total_results: number
}

export interface SerieProps {
    adult: boolean,
    backdrop_path: string,
    genre_ids: number[],
    id: number,
    origin_country: string[],
    original_language: string,
    original_name: string,
    overview: string,
    popularity: number,
    poster_path: string,
    first_air_date: string,
    name: string,
    vote_average: number,
    vote_count: number
}

export interface SerieDetailsProps {
    adult: boolean,
    backdrop_path: string,
    created_by: CreatedByProps[],
    episode_run_time: number[],
    first_air_date: string,
    genres: GenresProps[],
    homepage: string,
    id: number,
    in_production: boolean,
    languages: string[],
    last_air_date: string,
    last_episode_to_air: EpisodeToAirProps,
    name: string,
    next_episode_to_air: EpisodeToAirProps,
    networks: NetworksProps[],
    number_of_episodes: number,
    number_of_seasons: number,
    origin_country: string[],
    original_language: string,
    original_name: string,
    overview: string,
    popularity: number,
    poster_path: string,
    production_companies: ProductionCompaniesProps[],
    production_countries: ProductionCountriesProps[],
    seasons: SeasonProps[],
    status: string,
    tagline: string,
    type: string,
    vote_average: number,
    vote_count: number
}

interface CreatedByProps {
    id: number,
    credit_id: string,
    name: string,
    gender: number,
    profile_path: string
}

interface EpisodeToAirProps {
    id: number,
    name: string,
    overview: string,
    vote_average: number,
    vote_count: number,
    air_date: string,
    episode_number: number,
    episode_type: string,
    production_code: string,
    runtime: number | null,
    season_number: number,
    show_id: number,
    still_path: null
}

interface NetworksProps {
    id: number,
    logo_path: string,
    name: string,
    origin_country: string
}

interface ProductionCompaniesProps {
    id: number,
    logo_path: string,
    name: string,
    origin_country: string 
}

interface ProductionCountriesProps {
    iso_3166_1: string,
    name: string
}

interface SeasonProps {
    air_date: string,
    episode_count: number,
    id: number,
    name: string,
    overview: string,
    poster_path: string | null,
    season_number: number,
    vote_average: number
}