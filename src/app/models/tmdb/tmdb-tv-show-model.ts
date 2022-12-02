import {
  TmdbCredits,
  TmdbGenre, TmdbKeyword, TmdbKeywords,
  TmdbProductionCompany,
  TmdbProductionCountry,
  TmdbSpokenLanguage, TmdbWatchProviders
} from "./tmdb-movie.model";

export interface TMDB_TvShow {
  adult: boolean;
  backdrop_path: string;
  created_by: TmdbProductionCompany[];
  episode_run_time: number[];
  first_air_date: string;
  genres: TmdbGenre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: TMDB_tvShow_episode_to_air;
  name: string;
  next_episode_to_air?: string;
  networks: TMDB_tvShow_networks[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: TmdbProductionCompany[];
  production_countries: TmdbProductionCountry[];
  seasons: TMDB_tvShow_seasons[];
  spoken_languages: TmdbSpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
  credits: TmdbCredits,
  "watch/providers": TmdbWatchProviders,
  keywords?: Tmdb_tvshow_Keywords
}
export interface TMDB_tvShow_episode_to_air {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path?: any;
  vote_average: number;
  vote_count: number;
}

export interface TMDB_tvShow_networks {
  id: number;
  name: string;
  logo_path?: string;
  origin_country: string;
}
export interface TMDB_tvShow_seasons {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
}
export interface Tmdb_tvshow_Keywords {
  results: TmdbKeyword[]
}
