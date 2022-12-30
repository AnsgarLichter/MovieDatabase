import {Injectable} from "@angular/core";

import {Adapter} from "./base.adapter";
import {GenreAdapter} from "./genre.adapter";

import {TvShow} from "../models/tv-show.model";
import {ImageUrlProvider} from "../utilities/image-url-provider";
import {TMDB_TvShow} from "../models/tmdb/tmdb-tv-show-model";
import {CastAdapter} from "./cast.adapter";
import {CrewAdapter} from "./crew.adapter";
import {WatchProvidersAdapter} from "./watch-provider.adapter";
import {KeywordAdapter} from "./keyword.adapter";
import {TvSeasonsAdapter} from "./tv-season.adapter";
import {getDirectorsAndWriters} from "../utilities/functions";


@Injectable({
  providedIn: "root",
})
export class TvShowAdapter implements Adapter<TvShow> {

  constructor(
    private imagePathProvider: ImageUrlProvider,
    private genreAdapter: GenreAdapter,
    //private belongsToCollectionAdapter: BelongsToCollectionAdapter,
    private castAdapter: CastAdapter,
    private crewAdapter: CrewAdapter,
    private tvSeasonsAdapter: TvSeasonsAdapter,
    private watchProvidersAdapter: WatchProvidersAdapter,
    private keywordAdapter: KeywordAdapter,
  ) {
  }

  adapt(item: TMDB_TvShow): TvShow {
    const genres = item.genres.map(genre => this.genreAdapter.adapt(genre));
    const castMembers = item.credits.cast.map(castMember => this.castAdapter.adapt(castMember));
    const crewMembers = item.credits.crew.map(crewMember => this.crewAdapter.adapt(crewMember));
    const seasons = item.seasons.map(seasons => this.tvSeasonsAdapter.adapt(seasons));
    const directorsAndWriters = getDirectorsAndWriters(crewMembers);
    const watchProviders = this.watchProvidersAdapter.adapt(item["watch/providers"]);
    const keywords = item.keywords?.results.map(keyword => this.keywordAdapter.adapt(keyword));

    const backdropPath = this.imagePathProvider.getBackdropUrl(item.backdrop_path) || "assets/fallbackPictureMovie.png";
    const posterPath = this.imagePathProvider.getPosterUrl(item.poster_path) || "assets/fallbackPictureMovie.png";

    return new TvShow(
      item.id,
      item.adult,
      backdropPath,
      item.created_by,
      item.episode_run_time.sort((n1,n2) => n1 - n2),
      new Date(item.first_air_date),
      genres,
      item.homepage,
      item.in_production,
      item.languages,
      new Date(item.last_air_date),
      item.last_episode_to_air,
      item.name,
      item.networks,
      item.number_of_episodes,
      item.number_of_seasons,
      item.origin_country,
      item.original_language,
      item.original_name,
      item.overview,
      item.popularity,
      item.production_companies,
      item.production_countries,
      seasons,
      item.spoken_languages,
      item.status,
      item.tagline,
      item.type,
      item.vote_average * 10,
      item.vote_count,
      watchProviders,
      castMembers,
      crewMembers,
      directorsAndWriters,
      keywords,
      item.next_episode_to_air,
      posterPath,
    );
  }
}
