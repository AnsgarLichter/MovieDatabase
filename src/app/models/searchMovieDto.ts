export class SearchMovie {
  constructor(
    public id: number,
    public originalTitle: string,
    public releaseDate: Date,
    public overview: string,
    public posterPath: string,
  ) {
  }

}
