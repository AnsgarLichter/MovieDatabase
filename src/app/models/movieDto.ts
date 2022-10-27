export interface Movie {
    adult: boolean,
    backdrop_path: String,
    belongs_to_collection: BelongsToCollection,
    budget: number,
    genres: Genres,
    homepage: String,
    id: number,
    imdb_id: String,
    original_language: String,
    original_title: String,
    overview: String,
    popularity: number,
    poster_path: String,
    production_companies: ProductionCompanies,
    production_countries: ProductionCountries,
    release_date: String,
    revenue: number,
    runtime: number,
    spoken_languages: SpokenLanguages,
    status: String,
    tagline: String,
    title: String,
    video: boolean,
    vote_average: number,
    vote_count: number
}

interface BelongsToCollection {
    id: number,
    name: String,
    poster_path: String,
    backdrop_path: String
}

interface Genres {
    id: number,
    name: String
}

interface ProductionCompanies {
    id: number,
    logo_path: String,
    name: String,
    origin_country: String
}

interface ProductionCountries {
    iso_3166_1: String,
    name: String
}

interface SpokenLanguages {
    english_name: String,
    iso_639_1: String,
    name: String
}