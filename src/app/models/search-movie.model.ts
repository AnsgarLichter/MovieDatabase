export class SearchResults<T> {
  constructor(
    public page: number,
    public results: T[],
    public totalPages: number
  ) {
  }
}

export class SearchMovie {
  constructor(
    public id: number,
    public originalTitle: string,
    public overview: string,
    public posterPath: string,
    public releaseDate: Date,
  ) {
  }

}
