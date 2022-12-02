export interface TmdbMovie {
  adult: boolean,
  backdrop_path: string,
  belongs_to_collection: TmdbBelongsToCollection,
  budget: number,
  genres: TmdbGenre[],
  homepage: string,
  id: number,
  imdb_id: string,
  original_language: string,
  original_title: string,
  overview: string,
  popularity: number,
  poster_path: string,
  production_companies: TmdbProductionCompany[],
  production_countries: TmdbProductionCountry[],
  release_date: string,
  revenue: number,
  runtime: number,
  spoken_languages: TmdbSpokenLanguage[],
  status: string,
  tagline: string,
  title: string,
  video: boolean,
  vote_average: number,
  vote_count: number,
  credits: TmdbCredits,
  "watch/providers": TmdbWatchProviders,
  keywords: TmdbKeywords
}

export interface TmdbBelongsToCollection {
  id: number,
  name: string,
  poster_path: string,
  backdrop_path: string
}

export interface TmdbGenre {
  id: number,
  name: string
}

export interface TmdbProductionCompany {
  id: number,
  logo_path: string,
  name: string,
  origin_country: string
}

export interface TmdbProductionCountry {
  iso_3166_1: string,
  name: string
}

export interface TmdbSpokenLanguage {
  english_name: string,
  iso_639_1: string,
  name: string
}

export interface TmdbCredits {
  cast: TmdbCastMember[]
  crew: TmdbCrewMember[]
}

export interface TmdbCastMember {
  adult: false,
  gender: number,
  id: number,
  known_for_department: string,
  name: string,
  original_name: string,
  popularity: number,
  profile_path: string,
  character: string,
  credit_id: number,
  order: number
}

export interface TmdbCrewMember {
  adult: boolean,
  gender: number,
  id: number,
  known_for_department: string,
  name: string,
  original_name: string,
  popularity: number,
  profile_path: string,
  credit_id: number,
  department: string,
  job: string
}

export interface TmdbWatchProviders {
  results: TmdbWatchProviderCountries
}

export interface TmdbWatchProviderCountries {
  "AZ": TmdbWatchProviderInCountry,
  "AT": TmdbWatchProviderInCountry,
  "AU": TmdbWatchProviderInCountry,
  "BE": TmdbWatchProviderInCountry,
  "BR": TmdbWatchProviderInCountry,
  "CA": TmdbWatchProviderInCountry,
  "CH": TmdbWatchProviderInCountry,
  "CL": TmdbWatchProviderInCountry,
  "CO": TmdbWatchProviderInCountry,
  "CZ": TmdbWatchProviderInCountry,
  "DE": TmdbWatchProviderInCountry,
  "DK": TmdbWatchProviderInCountry,
  "EC": TmdbWatchProviderInCountry,
  "EE": TmdbWatchProviderInCountry,
  "ES": TmdbWatchProviderInCountry,
  "FI": TmdbWatchProviderInCountry,
  "FR": TmdbWatchProviderInCountry,
  "GB": TmdbWatchProviderInCountry,
  "GR": TmdbWatchProviderInCountry,
  "HU": TmdbWatchProviderInCountry,
  "ID": TmdbWatchProviderInCountry,
  "IE": TmdbWatchProviderInCountry,
  "IN": TmdbWatchProviderInCountry,
  "IT": TmdbWatchProviderInCountry,
  "JP": TmdbWatchProviderInCountry,
  "KR": TmdbWatchProviderInCountry,
  "LT": TmdbWatchProviderInCountry,
  "LV": TmdbWatchProviderInCountry,
  "MX": TmdbWatchProviderInCountry,
  "MY": TmdbWatchProviderInCountry,
  "NL": TmdbWatchProviderInCountry,
  "NO": TmdbWatchProviderInCountry,
  "NZ": TmdbWatchProviderInCountry,
  "PE": TmdbWatchProviderInCountry,
  "PH": TmdbWatchProviderInCountry,
  "PL": TmdbWatchProviderInCountry,
  "PT": TmdbWatchProviderInCountry,
  "RO": TmdbWatchProviderInCountry,
  "RU": TmdbWatchProviderInCountry,
  "SE": TmdbWatchProviderInCountry,
  "SG": TmdbWatchProviderInCountry,
  "TH": TmdbWatchProviderInCountry,
  "TR": TmdbWatchProviderInCountry,
  "US": TmdbWatchProviderInCountry,
  "VE": TmdbWatchProviderInCountry,
  "ZA": TmdbWatchProviderInCountry
}

export interface TmdbWatchProviderInCountry {
  link: string,
  buy: TmdbWatchProvider[],
  rent: TmdbWatchProvider[],
  flatrate: TmdbWatchProvider[]
}

export interface TmdbWatchProvider {
  logo_path: string,
  provider_id: number,
  provider_name: string,
  display_priority: number
}

export interface TmdbKeywords {
  keywords: TmdbKeyword[]
}

export interface TmdbKeyword {
  id: number,
  name: string
}
