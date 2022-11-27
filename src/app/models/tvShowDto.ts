export interface tvSHow {
	adult: boolean;
	backdrop_path: string;
	created_by: tvShow_created_by[];
	episode_run_time: number[];
	first_air_date: string;
	genres: tvShow_genres[];
	homepage: string;
	id: number;
	in_production: boolean;
	languages: string[];
	last_air_date: string;
	last_episode_to_air: tvShow_episode_to_air;
	name: string;
	next_episode_to_air?: string;
	networks: tvShow_networks[];
	number_of_episodes: number;
	number_of_seasons: number;
	origin_country: string[];
	original_language: string;
	original_name: string;
	overview: string;
	popularity: number;
	poster_path?: string;
	production_companies: tvShow_production_companies[];
	production_countries: tvShow_countries[];
	seasons: tvShow_seasons[];
	spoken_languages: tvShow_languages[];
	status: string;
	tagline: string;
	type: string;
	vote_average: number;
	vote_count: number;
}

export interface tvShow_created_by {
  id: number;
  logo_path?: string;
  name: string;
  origin_country: string;
}

export interface tvShow_production_companies {
  id: number;
  credit_id: number;
  name: string;
  gender: number;
  profile_path?: string;
}

export interface tvShow_genres {
	id: number;
	name: string;
}

export interface tvShow_episode_to_air {
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

export interface tvShow_networks {
	id: number;
	name: string;
	logo_path?: string;
	origin_country: string;
}

export interface tvShow_countries {
	iso_3166_1: string;
	name: string;
}

export interface tvShow_seasons {
	air_date: string;
	episode_count: number;
	id: number;
	name: string;
	overview: string;
	poster_path: string;
	season_number: number;
}

export interface tvShow_languages {
	english_name: string;
	iso_639_1: string;
	name: string;
}
