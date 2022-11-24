export interface TmdbSearchMovieResults {
  page: string,
  total_results: number,
  total_pages: number,
  results: TmdbSearchMovie[],
}

export interface TmdbSearchMovie {
  id: number,
  original_title: string,
  original_language: string,
  title: string,
  overview: string,
  release_date: string,
  popularity: number,
  vote_count: number,
  vote_average: number,
  video: boolean,
  poster_path: string,
  backdrop_path: string,
  adult: boolean,
  genre_ids: number[],
}