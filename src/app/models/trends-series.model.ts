export class SeriesTrends {
    constructor(
        public page: number,
        public results: ResultsSeries[] 
    ){}
}

export class ResultsSeries {
    constructor(
        public adult: boolean,
        public backdrop_path: string,
        public id: number,
        public name: string,
        public original_language: string,
        public original_title: string,
        public overview: string,
        public poster_path: string,
        public media_type: string,
        public genre_ids: number[],
        public popularity: number,
        public first_air_date: string,
        public vote_average: number,
        public vote_count: number,
        public origin_country: string[]
    ){}
}