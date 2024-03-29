export class Movie {
  constructor(
    public id: number,
    public originalTitle: string,
    public originalLanguage: string,
    public title: string,
    public tagline: string,
    public overview: string,
    public releaseDate: Date | undefined,
    public runtime: number,
    public revenue: number,
    public budget: number,
    public voteAverage: number,
    public voteCount: number,
    public adult: boolean,
    public backdropPath: string,
    public posterPath: string,
    public status: string,
    public genres: Genre[],
    public belongsToCollection: BelongsToCollection | null,
    public cast: CastMember[],
    public crew: CrewMember[],
    public directorsAndWriters: DirectorOrWriter[],
    public productionCompanies: ProductionCompany[],
    public productionCountries: ProductionCountry[],
    public spokenLanguages: SpokenLanguage[],
    public watchProviders: WatchProvider[],
    public keywords: Keyword[],
  ) {
  }
}

export class Genre {
  constructor(
    public id: number,
    public name: string
  ) {
  }
}

export class BelongsToCollection {
  constructor(
    public id: number,
    public name: string,
    public posterPath: string,
    public backdropPath: string
  ) {
  }
}

export class CastMember {
  constructor(
    public id: number,
    public creditId: number,
    public original_name: string,
    public name: string,
    public gender: number,
    public character: string,
    public order: number,
    public profilePath: string
  ) {
  }
}

export class CrewMember {
  constructor(
    public id: number,
    public creditId: number,
    public original_name: string,
    public name: string,
    public gender: number,
    public job: string,
    public profilePath: string,
  ) {
  }
}

export class DirectorOrWriter {
  constructor(
    public originalName: string,
    public name: string,
    public isDirector: boolean,
    public isWriter: boolean
  ) {
  }
}

export class ProductionCompany {
  constructor(
    public id: number,
    public name: string,
    public origin_country: string,
    public logo_path: string,
  ) {
  }
}

export class ProductionCountry {
  constructor(
    public name: string,
    public iso_3166_1: string
  ) {
  }
}

export class SpokenLanguage {
  constructor(
    public english_name: string,
    public name: string,
    public iso_639_1: string
  ) {
  }
}

export class WatchProvider {
  constructor(
    public providerId: number,
    public providerName: string,
    public isAvailableToBuy: boolean,
    public isAvailableForRent: boolean,
    public isAvailableInFlatrate: boolean,
    public logoPath: string,
    public country: string,
    public displayPriority: number
  ) {
  }
}

export class Keyword {
  constructor(
    public id: number,
    public name: string
  ) {
  }
}

export enum WatchProviderType {
  flatrate = "flatrate",
  rent = "rent",
  buy = "buy"
}
