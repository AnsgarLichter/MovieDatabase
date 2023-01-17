import {
  CastMember,
  CrewMember,
  DirectorOrWriter,
  Genre, Keyword,
  ProductionCompany,
  ProductionCountry,
  SpokenLanguage, WatchProvider
} from "./movie.model";

export class TvShow {
  constructor(
    public id: number,
    public adult: boolean,
    public backdrop_path: string,
    public created_by: ProductionCompany[],
    public episode_run_time: number[],
    public first_air_date: Date,
    public genres: Genre[],
    public homepage: string,
    public in_production: boolean,
    public languages: string[],
    public last_air_date: Date,
    public last_episode_to_air: tvShow_episode_to_air,
    public name: string,
    public networks: tvShow_networks[],
    public number_of_episodes: number,
    public number_of_seasons: number,
    public origin_country: string[],
    public original_language: string,
    public original_name: string,
    public overview: string,
    public popularity: number,
    public production_companies: ProductionCompany[],
    public production_countries: ProductionCountry[],
    public seasons: tvShow_seasons[],
    public spoken_languages: SpokenLanguage[],
    public status: string,
    public tagline: string,
    public type: string,
    public vote_average: number,
    public vote_count: number,
    public watchProvider: WatchProvider[],
    public cast?: CastMember[],
    public crew?: CrewMember[],
    public directorsAndWriters?: DirectorOrWriter[],
    public keywords?: Keyword[],
    public next_episode_to_air?: string | undefined,
    public poster_path?: string,
  ) {
  }
}
export class tvShow_production_companies {
  constructor(
    public id: number,
    public credit_id: number,
    public name: string,
    public gender: number,
    public profile_path?: string,
  ) {
  }
}
export class tvShow_episode_to_air {
  constructor(
    public air_date: string,
    public episode_number: number,
    public id: number,
    public name: string,
    public overview: string,
    public production_code: string,
    public runtime: number,
    public season_number: number,
    public show_id: number,
    public vote_average: number,
    public vote_count: number,
    public still_path?: any,
  ) {
  }
}

export class tvShow_networks {
  constructor(
    public id: number,
    public name: string,
    public origin_country: string,
    public logo_path?: string,
  ) {
  }
}
export class tvShow_seasons {
  constructor(
    public air_date: Date,
    public episode_count: number,
    public id: number,
    public name: string,
    public overview: string,
    public poster_path: string,
    public season_number: number,
  ) {
  }
}
