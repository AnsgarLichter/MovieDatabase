export interface MovieTrends {
    page: number,
    results: ResultsMovie[] 
}

interface ResultsMovie {
    adult: boolean,
    backdrop_path: String,
    id: number,
    title: String,
    original_language: String,
    original_title: String,
    overview: String,
    poster_path: String,
    media_type: String,
    genre_ids: number[],
    popularity: number,
    release_date: String,
    video: boolean,
    vote_average: number,
    vote_count: number
}

export interface SeriesTrends {
    page: number,
    results: ResultsSeries[] 
}

interface ResultsSeries {
    adult: boolean,
    backdrop_path: String,
    id: number,
    name: String,
    original_language: String,
    original_title: String,
    overview: String,
    poster_path: String,
    media_type: String,
    genre_ids: number[],
    popularity: number,
    first_air_date: String,
    vote_average: number,
    vote_count: number,
    origin_country: String[]
}