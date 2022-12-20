export class SearchTVShow {
  constructor(
    public id: number,
    public originalName: string,
    public overview: string,
    public posterPath: string,
    public firstAirDate: Date,
  ) {
  }

}
