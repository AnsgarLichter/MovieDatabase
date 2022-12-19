export class ActorsSearch{
    constructor(
        public adult: boolean,
        public gender: number,
        public id: number,
        public known_for: KnownFor[],
        public known_for_department: string,
        public name: string,
        public popularity: number,
        public profile_path: string | null
    ){
    }
}

export class KnownFor{
    constructor(
        public adult: boolean,
        public backdrop_path: string,
        public genre_ids: number[],
        public id: number,
        public media_type: string,
        public original_title: string,
        public original_language: string,
        public overview: string,
        public poster_path: string,
        public release_date: string,
        public title: string,
        public video: boolean,
        public vote_average: number,
        public vote_count: number
    ){
    }
}