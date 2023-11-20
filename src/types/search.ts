export interface SearchContentProps {
  page: number;
  results: [];
  total_pages: number;
  total_results: number;
}

export interface SingleContentProps {
    adult: boolean,
    backdrop_path: string | null
    id: string,
    name?: string,
    title?: string,
    original_language: string,
    original_name?: string,
    original_title?: string,
    overview: string,
    poster_path: string,
    media_type: string,
    genre_ids: number[],
    popularity: number,
    first_air_date?: string,
    release_date?: string,
    video?: boolean,
    vote_average: number,
    vote_count: number,
    origin_country?: string[]
  }
