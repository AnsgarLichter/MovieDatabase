import { Injectable } from '@angular/core';
import { Adapter } from './base.adapter';
import { ActorsSearch, KnownForSearch } from '../models/search-actors.model';
import {
  TmdbActorsSearch,
  TmdbKnownFor,
  TmdbSearchActorsResult,
} from '../models/tmdb/tmdb-search-actors.model';
import { ImageUrlProvider } from '../utilities/image-url-provider';
import { ActorsSearchFlat } from '../models/search-actors-flat.model';

@Injectable({
  providedIn: 'root',
})
export class ActorsSearchAdapter implements Adapter<ActorsSearchFlat[]> {
  constructor(private imagePathProvider: ImageUrlProvider) {}

  adapt(item: TmdbSearchActorsResult): ActorsSearchFlat[] {
    var actorsSearchList: ActorsSearchFlat[] = [];

    item.results.forEach((actors) => {
      actorsSearchList.push({
        id: actors.id,
        name: actors.name,
        profilePath: this.imagePathProvider.getProfileUrl(actors.profile_path),
      });
    });

    return actorsSearchList;
  }

  adaptNew(item: TmdbSearchActorsResult): ActorsSearch {
    let actors: TmdbActorsSearch | undefined;
    var actorsSearchList: ActorsSearchFlat[] = [];

    item.results.forEach((actors) => {
      actorsSearchList.push({
        id: actors.id,
        name: actors.name,
        profilePath: actors.profile_path,
      });
    });

    const test = item.results.map((item) => (actors = item));

    const profile_path = this.imagePathProvider.getProfileUrl(
      test[0].profile_path
    );

    var knownForList: KnownForSearch[] = []

    test[0].known_for.forEach((knownFor) => {
      knownForList.push(this.knownForAdapter(knownFor))
    });

    return new ActorsSearch(
      test[0].adult,
      test[0].gender,
      test[0].id,
      knownForList,
      test[0].known_for_department,
      test[0].name,
      test[0].popularity,
      profile_path
    );
  }

  private knownForAdapter(knownFor: TmdbKnownFor): KnownForSearch {
    return new KnownForSearch(
      knownFor.adult,
      knownFor.backdrop_path,
      knownFor.genre_ids,
      knownFor.id,
      knownFor.media_type,
      knownFor.original_title,
      knownFor.original_language,
      knownFor.overview,
      knownFor.poster_path,
      new Date(knownFor.release_date),
      knownFor.title,
      knownFor.video,
      knownFor.vote_average,
      knownFor.vote_count
    );
  }
}
