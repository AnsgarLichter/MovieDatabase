import { Injectable } from '@angular/core';
import { Adapter } from './base.adapter';
import { ActorsSearch, KnownForSearch } from '../models/search-actors.model';
import {
  TmdbActorsSearch,
  TmdbKnownFor,
} from '../models/tmdb/tmdb-search-actors.model';
import { ImageUrlProvider } from '../utilities/image-url-provider';
import { TmdbSearchResults } from '../models/tmdb/tdmb-search-result.model';
import { SearchResults } from '../models/search-movie.model';

@Injectable({
  providedIn: 'root',
})
export class ActorsSearchAdapter
  implements Adapter<SearchResults<ActorsSearch>>
{
  constructor(private imagePathProvider: ImageUrlProvider) {}

  adapt(
    item: TmdbSearchResults<TmdbActorsSearch>
  ): SearchResults<ActorsSearch> {
    var actorsSearchList: ActorsSearch[] = [];
    item.results.forEach((results) =>
      actorsSearchList.push(this.actorsSearchAdapter(results))
    );

    return new SearchResults(item.page, actorsSearchList, item.total_pages);
  }

  private actorsSearchAdapter(actorSearch: TmdbActorsSearch): ActorsSearch {
    var knownForList: KnownForSearch[] = [];
    actorSearch.known_for.forEach((result) =>
      knownForList.push(this.knownForAdapter(result))
    );
    return new ActorsSearch(
      actorSearch.adult,
      actorSearch.gender,
      actorSearch.id,
      knownForList,
      actorSearch.known_for_department,
      actorSearch.name,
      actorSearch.popularity,
      this.imagePathProvider.getProfileUrl(actorSearch.profile_path)
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
