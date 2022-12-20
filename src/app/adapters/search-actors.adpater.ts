import { Injectable } from '@angular/core';
import { Adapter } from './base.adapter';
import { ActorsSearch, KnownFor } from '../models/search-actors.model';
import {
  TmdbActorsSearch,
  TmdbSearchActorsResult,
} from '../models/tmdb/tmdb-search-actors.model';
import { TmdbSearchResults } from '../models/tmdb/tdmb-search-result.model';
import { TmdbSearchSimpleResult } from '../models/tmdb/tmdb-search-simple-result.model';
import { ImageUrlProvider } from '../utilities/image-url-provider';
import { ActorsSearchNew } from '../models/search-actors-new.model';

@Injectable({
  providedIn: 'root',
})
export class ActorsSearchAdapter implements Adapter<ActorsSearchNew[]> {
  constructor(private imagePathProvider: ImageUrlProvider) {}

  adapt(item: TmdbSearchActorsResult): ActorsSearchNew[] {
    let actors: TmdbActorsSearch | undefined;
    var actorsSearchList: ActorsSearchNew[] = [];

    item.results.forEach((actors) => {
      actorsSearchList.push({
        id: actors.id,
        name: actors.name,
        profile_path: this.imagePathProvider.getProfileUrl(actors.profile_path),
      });
    });

    return actorsSearchList;
  }

  
  /*adapt(item: TmdbSearchActorsResult): ActorsSearch {
    let actors: TmdbActorsSearch | undefined;
    var actorsSearchList: ActorsSearchNew[] = [];

    item.results.forEach((actors) => {
      actorsSearchList.push({
        id: actors.id,
        name: actors.name,
        profile_path: actors.profile_path,
      });
    });
    console.log(actorsSearchList);

    const test = item.results.map((item) => (actors = item));

    const profile_path = this.imagePathProvider.getProfileUrl(
      test[0].profile_path
    );

    return new ActorsSearch(
      test[0].adult,
      test[0].gender,
      test[0].id,
      test[0].known_for,
      test[0].known_for_department,
      test[0].name,
      test[0].popularity,
      profile_path
    );
  }*/

  
  private adaptActors(actors: TmdbActorsSearch): ActorsSearch {
    console.log('Adapt', actors);
    return new ActorsSearch(
      actors.adult,
      actors.gender,
      actors.id,
      actors.known_for,
      actors.known_for_department,
      actors.name,
      actors.popularity,
      actors.profile_path
    );
  }

  private knownForAdapter(knownFor: KnownFor): KnownFor {
    return new KnownFor(
      knownFor.adult,
      knownFor.backdrop_path,
      knownFor.genre_ids,
      knownFor.id,
      knownFor.media_type,
      knownFor.original_language,
      knownFor.original_title,
      knownFor.overview,
      knownFor.poster_path,
      knownFor.release_date,
      knownFor.title,
      //knownFor.popularity,
      knownFor.video,
      knownFor.vote_average,
      knownFor.vote_count
    );
  }
}
