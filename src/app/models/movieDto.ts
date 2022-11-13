export interface Movie {
    adult: boolean,
    backdrop_path: String,
    belongs_to_collection: BelongsToCollection,
    budget: number,
    genres: Genre[],
    homepage: String,
    id: number,
    imdb_id: String,
    original_language: String,
    original_title: String,
    overview: String,
    popularity: number,
    poster_path: String,
    production_companies: ProductionCompany[],
    production_countries: ProductionCountry[],
    release_date: String,
    revenue: number,
    runtime: number,
    spoken_languages: SpokenLanguage[],
    status: String,
    tagline: String,
    title: String,
    video: boolean,
    vote_average: number,
    vote_count: number,
    credits: Credits,
    "watch/providers": WatchProviders,
}

export interface BelongsToCollection {
    id: number,
    name: String,
    poster_path: String,
    backdrop_path: String
}

export interface Genre {
    id: number,
    name: String
}

export interface ProductionCompany {
    id: number,
    logo_path: String,
    name: String,
    origin_country: String
}

export interface ProductionCountry {
    iso_3166_1: String,
    name: String
}

export interface SpokenLanguage {
    english_name: String,
    iso_639_1: String,
    name: String
}

export interface Credits {
  cast: CastMember[]
  crew: CrewMember[]
}

export interface CastMember {
  adult: false,
  gender: number,
  id: number,
  known_for_department: string,
  name: string,
  original_name: string,
  popularity: number,
  profile_path: string,
  cast_id: number,
  character: string,
  credit_id: number,
  order: number
}

export interface CrewMember {
  adult: boolean,
  gender: number,
  id: number,
  known_for_department: string,
  name: string,
  original_name: string,
  popularity: number,
  profile_path: null,
  credit_id: string,
  department: string,
  job: string
}

export interface WatchProviders {
  results: WatchProviderCountries
}

export interface WatchProviderCountries {
  "AZ": WatchProviderInCountry,
  "AT": WatchProviderInCountry,
  "AU": WatchProviderInCountry,
  "BE": WatchProviderInCountry,
  "BR": WatchProviderInCountry,
  "CA": WatchProviderInCountry,
  "CH": WatchProviderInCountry,
  "CL": WatchProviderInCountry,
  "CO": WatchProviderInCountry,
  "CZ": WatchProviderInCountry,
  "DE": WatchProviderInCountry,
  "DK": WatchProviderInCountry,
  "EC": WatchProviderInCountry,
  "EE": WatchProviderInCountry,
  "ES": WatchProviderInCountry,
  "FI": WatchProviderInCountry,
  "FR": WatchProviderInCountry,
  "GB": WatchProviderInCountry,
  "GR": WatchProviderInCountry,
  "HU": WatchProviderInCountry,
  "ID": WatchProviderInCountry,
  "IE": WatchProviderInCountry,
  "IN": WatchProviderInCountry,
  "IT": WatchProviderInCountry,
  "JP": WatchProviderInCountry,
  "KR": WatchProviderInCountry,
  "LT": WatchProviderInCountry,
  "LV": WatchProviderInCountry,
  "MX": WatchProviderInCountry,
  "MY": WatchProviderInCountry,
  "NL": WatchProviderInCountry,
  "NO": WatchProviderInCountry,
  "NZ": WatchProviderInCountry,
  "PE": WatchProviderInCountry,
  "PH": WatchProviderInCountry,
  "PL": WatchProviderInCountry,
  "PT": WatchProviderInCountry,
  "RO": WatchProviderInCountry,
  "RU": WatchProviderInCountry,
  "SE": WatchProviderInCountry,
  "SG": WatchProviderInCountry,
  "TH": WatchProviderInCountry,
  "TR": WatchProviderInCountry,
  "US": WatchProviderInCountry,
  "VE": WatchProviderInCountry,
  "ZA": WatchProviderInCountry
}

export interface WatchProviderInCountry {
  link: string,
  buy: WatchProvider[],
  rent: WatchProvider[],
  flatrate: WatchProvider[]
}

export interface WatchProvider {
  logo_path: string,
  provider_id: number,
  provider_name: string,
  display_priority: number
}
