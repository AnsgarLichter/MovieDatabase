export interface TmdbSearchActorsResult {
    page: number,
    total_pages: number,
    total_results: number,
    results: TmdbActorsSearch[]
}

export interface TmdbActorsSearch{
    adult: boolean,
    gender: number,
    id: number,
    known_for: KnownFor[],
    known_for_department: string
    name: string,
    popularity: number
    profile_path: string,
}

interface KnownFor {
    poster_path: string,
    adult: boolean,
    overview: string,
    release_date: string,
    original_title: string,
    genre_ids: number[],
    id: number,
    media_type: string,
    original_language: string,
    title: string,
    backdrop_path: string,
    popularity: number,
    vote_count: number,
    video: boolean,
    vote_average: number
}