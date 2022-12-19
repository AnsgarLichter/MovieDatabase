import {Injectable} from "@angular/core";

import {Adapter} from "./base.adapter";
import {GenreAdapter} from "./genre.adapter";
import {BelongsToCollectionAdapter} from "./belongs-to-collection.adapter";
import {CastAdapter} from "./cast.adapter";
import {CrewAdapter} from "./crew.adapter";
import {WatchProvidersAdapter} from "./watch-provider.adapter";

import {CrewMember, DirectorOrWriter, Movie} from "../models/movie.model";
import {TmdbMovie} from "../models/tmdb/tmdb-movie.model";
import {KeywordAdapter} from "./keyword.adapter";
import {ImageUrlProvider} from "../utilities/image-url-provider";
import {ProductionCompanyAdapter} from "./production-country.adapter";
import {ProductionCountryAdapter} from "./production-company.adapter";
import {SpokenLanguageAdapter} from "./spoken-language.adapter";


@Injectable({
  providedIn: "root",
})
export class MovieAdapter implements Adapter<Movie> {
  JOB_TITLES = {
    DIRECTOR: "Director",
    WRITER: "Writer"
  }

  constructor(
    private imagePathProvider: ImageUrlProvider,
    private genreAdapter: GenreAdapter,
    private belongsToCollectionAdapter: BelongsToCollectionAdapter,
    private castAdapter: CastAdapter,
    private crewAdapter: CrewAdapter,
    private productionCompanyAdapter: ProductionCompanyAdapter,
    private productionCountryAdapter: ProductionCountryAdapter,
    private spokenLanguageAdapter: SpokenLanguageAdapter,
    private watchProvidersAdapter: WatchProvidersAdapter,
    private keywordAdapter: KeywordAdapter,
  ) {
  }

  adapt(item: TmdbMovie): Movie {
    const genres = item.genres.map(genre => this.genreAdapter.adapt(genre));
    const castMembers = item.credits.cast.map(castMember => this.castAdapter.adapt(castMember));
    const crewMembers = item.credits.crew.map(crewMember => this.crewAdapter.adapt(crewMember));
    const directorsAndWriters = this.getDirectorsAndWriters(crewMembers);
    const productionCompanies = item.production_companies.map(productCompany => this.productionCompanyAdapter.adapt(productCompany));
    const productionCountries = item.production_countries.map(productionCountry => this.productionCountryAdapter.adapt(productionCountry));
    const spokenLanguages = item.spoken_languages.map(spokenLanguage => this.spokenLanguageAdapter.adapt(spokenLanguage));
    const watchProviders = this.watchProvidersAdapter.adapt(item["watch/providers"]);
    const keywords = item.keywords.keywords.map(keyword => this.keywordAdapter.adapt(keyword));
    const belongsToCollection = item.belongs_to_collection
      ? this.belongsToCollectionAdapter.adapt(item.belongs_to_collection)
      : null;

    const backdropPath = this.imagePathProvider.getBackdropUrl(item.backdrop_path) || "assets/fallbackPictureMovie.png";
    const posterPath = this.imagePathProvider.getPosterUrl(item.poster_path) || "assets/fallbackPictureMovie.png";

    return new Movie(
      item.id,
      item.original_title,
      item.original_language,
      item.title,
      item.tagline,
      item.overview,
      new Date(item.release_date),
      item.runtime,
      item.revenue,
      item.budget,
      item.vote_average,
      item.vote_count,
      item.adult,
      backdropPath,
      posterPath,
      item.status,
      genres,
      belongsToCollection,
      castMembers,
      crewMembers,
      directorsAndWriters,
      productionCompanies,
      productionCountries,
      spokenLanguages,
      watchProviders,
      keywords
    );
  }

  getDirectorsAndWriters(crewMembers: CrewMember[]): DirectorOrWriter[] {
    const directorsAndWriters: DirectorOrWriter[] = [];

    crewMembers.filter((crewMember: CrewMember) => {
      const isDirector: boolean = crewMember.job === this.JOB_TITLES.DIRECTOR;
      const isWriter: boolean = crewMember.job === this.JOB_TITLES.WRITER;

      if (!isDirector && !isWriter) {
        return;
      }

      const directorOrWriter: DirectorOrWriter | undefined = directorsAndWriters.find(
        directorOrWriter => directorOrWriter.name === crewMember.name
      );
      if (!directorOrWriter) {
        directorsAndWriters.push(
          new DirectorOrWriter(
            crewMember.original_name,
            crewMember.name,
            isDirector,
            isWriter
          )
        );
        return;
      }

      directorOrWriter.isDirector = isDirector || directorOrWriter.isDirector;
      directorOrWriter.isWriter = isWriter || directorOrWriter.isWriter;
    });

    return directorsAndWriters;
  }
}
