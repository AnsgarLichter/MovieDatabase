export class Actors{
    constructor(
        public adult: boolean,
        public also_known_as: string[],
        public biography: string,
        public birthday: Date | null,
        public deathday: Date | null,
        public gender: number,
        public homepage: string | null,
        public id: number,
        public imdb_id: string,
        public known_for_department: string,
        public name: string,
        public place_of_birth: string,
        public popularity: number,
        public profile_path: string | null,
        public combined_credits: CombinedCredits
    ){
    }
}


export class CombinedCredits {
    constructor(
        public cast: Cast[],
        public crew: Crew[],
    ){}
}

export class Cast {
    constructor(
        public adult: boolean,
        public backdrop_path: string,
        public genre_ids: number[],
        public id: number,
        public origin_country: string[],
        public original_language: string,
        public original_name: string,
        public original_title: string,
        public overview: string,
        public popularity: number,
        public poster_path: string,
        public release_date: string,
        public title: string,
        public video: boolean,
        public vote_average: number,
        public vote_count: number,
        public character: string,
        public credit_id: string,
        public order: number,
        public media_type: string,
        public episode_count: number,
        //public first_air_date: Date,
    ){}
}

export class Crew {
    constructor(
        public id: number,
        public department: string,
        public original_language: string,
        public episode_count: number,
        public job: number,
        public overview: string,
        public origin_country: string[],
        public original_name: string,
        public vote_count: number,
        public release_date: string, 
        public name: string,
        public media_type: string,
        public popularity: number,
        public credit_id: string,
        public backdrop_path: string | null,
        public first_air_date: string,
        public vote_average: number,
        public genre_ids: number[],
        public poster_path: string | null,
        public original_title: string,
        public video: boolean,
        public title: string,
        public adult: boolean,
    ){}
}