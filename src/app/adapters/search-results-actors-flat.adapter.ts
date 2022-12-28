import { Injectable } from '@angular/core';
import { Adapter } from './base.adapter';
import { SearchResults } from '../models/search-movie.model';
import { TmdbSearchResults } from '../models/tmdb/tdmb-search-result.model';
import { TmdbActorsSearch } from '../models/tmdb/tmdb-search-actors.model';
import { ActorsSearchFlat } from '../models/search-actors-flat.model';
import { ImageUrlProvider } from '../utilities/image-url-provider';

@Injectable({
  providedIn: 'root',
})
export class SearchResultsActorsFlatAdapter
  implements Adapter<SearchResults<ActorsSearchFlat>>
{
  constructor(private imagePathProvider: ImageUrlProvider) {}

  adapt(
    item: TmdbSearchResults<TmdbActorsSearch>
  ): SearchResults<ActorsSearchFlat> {
    var adaptedResults: ActorsSearchFlat[] = [];
    item.results.forEach((result: TmdbActorsSearch) =>
      adaptedResults.push(this.mapActors(result))
    );

    return new SearchResults<ActorsSearchFlat>(
      item.page,
      adaptedResults,
      item.total_pages
    );
  }

  mapActors(item: TmdbActorsSearch): ActorsSearchFlat {
    return new ActorsSearchFlat(
      item.id,
      item.name,
      this.imagePathProvider.getProfileUrl(item?.profile_path)
    );
  }
}
