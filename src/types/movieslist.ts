export interface MoviesPage {
    page: number,
    results: MovieList[], 
    total_pages: number,
    total_results: number
}

export interface MovieList {
    adult: boolean,
    backdrop_path: string,
    genre_ids: number[],
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    poster_path: string,
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number
}

