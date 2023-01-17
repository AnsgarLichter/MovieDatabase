export class MovieTrends {
    constructor(
        public page: number,
        public results: ResultsMovie[]
    ){} 
}

export class ResultsMovie {
    constructor(
        public adult: boolean,
        public backdrop_path: string,
        public id: number,
        public title: string,
        public original_language: string,
        public original_title: string,
        public overview: string,
        public poster_path: string,
        public media_type: string,
        public genre_ids: number[],
        public popularity: number,
        public release_date: string,
        public video: boolean,
        public vote_average: number,
        public vote_count: number
    ){}
}