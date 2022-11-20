import {Injectable} from "@angular/core";

import {Adapter} from "./adapter";
import {GenreAdapter} from "./GenreAdapter";
import {BelongsToCollectionAdapter} from "./BelongsToCollectionAdapter";
import {CastAdapter} from "./CastAdapter";
import {CrewAdapter} from "./CrewAdapter";
import {ProductionCompanyAdapter} from "./ProductionCompanyAdapter";
import {ProductionCountryAdapter} from "./ProductionCountryAdapter";
import {SpokenLanguageAdapter} from "./SpokenLanguageAdapter";
import {WatchProvidersAdapter} from "./WatchProvidersAdapter";

import {CrewMember, DirectorOrWriter, Movie} from "../models/movieDto";
import {TmdbMovie} from "../models/tmdbMovieDto";
import {KeywordAdapter} from "./KeywordAdapter";


@Injectable({
  providedIn: "root",
})
export class MovieAdapter implements Adapter<Movie> {
  JOB_TITLES = {
    DIRECTOR: "Director",
    WRITER: "Writer"
  }

  constructor(
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
    const belongsToCollection = this.belongsToCollectionAdapter.adapt(item.belongs_to_collection);
    const castMembers = item.credits.cast.map(castMember => this.castAdapter.adapt(castMember));
    const crewMembers = item.credits.crew.map(crewMember => this.crewAdapter.adapt(crewMember));
    const directorsAndWriters = this.getDirectorsAndWriters(crewMembers);
    const productionCompanies = item.production_companies.map(productCompany => this.productionCompanyAdapter.adapt(productCompany));
    const productionCountries = item.production_countries.map(productionCountry => this.productionCountryAdapter.adapt(productionCountry));
    const spokenLanguages = item.spoken_languages.map(spokenLanguage => this.spokenLanguageAdapter.adapt(spokenLanguage));
    const watchProviders = this.watchProvidersAdapter.adapt(item["watch/providers"]);
    const keywords = item.keywords.keywords.map(keyword => this.keywordAdapter.adapt(keyword));

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
      item.backdrop_path, //TODO: insert configuration string?
      item.poster_path, //TODO: insert configuration string?
      item.status,
      genres,
      belongsToCollection,
      castMembers,
      crewMembers,
      directorsAndWriters,
      productionCompanies, //TODO: Is this in use?
      productionCountries, //TODO: Is this in use?
      spokenLanguages, //TODO: Is this in use?
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
