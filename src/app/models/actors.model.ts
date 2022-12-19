export class Actors{
    constructor(
        public adult: boolean,
        public also_known_as: string[],
        public biography: string,
        public birthday: string,
        public deathday: string | null,
        public gender: number,
        public homepage: string | null,
        public id: number,
        public imdb_id: string,
        public known_for_department: string,
        public name: string,
        public place_of_birth: string,
        public popularity: number,
        public profile_path: string
    ){
    }
}