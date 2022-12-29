import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ActorsSearchAdapter } from '../adapters/search-actors.adpater';
import { SearchResultsActorsFlatAdapter } from '../adapters/search-results-actors-flat.adapter';
import { ActorsSearchFlat } from '../models/search-actors-flat.model';
import { ActorsSearch } from '../models/search-actors.model';
import { SearchResults } from '../models/search-movie.model';
import { TmdbSearchResults } from '../models/tmdb/tdmb-search-result.model';
import {
  TmdbActorsSearch,
  TmdbSearchActorsResult,
} from '../models/tmdb/tmdb-search-actors.model';
import { MovieDbService } from './movie-db.service';

@Injectable({
  providedIn: 'root',
})
export class ActorsSearchService extends MovieDbService {
  constructor(
    protected override httpClient: HttpClient,
    private adapter: SearchResultsActorsFlatAdapter,
    private adapterSearch: ActorsSearchAdapter
  ) {
    super(httpClient);
    this.adapter = adapter;
  }

  public getActorsFlat(
    inputText: string,
    page?: number
  ): Observable<SearchResults<ActorsSearchFlat>> {
    const requestUrl = `${this.getBaselineUrl()}/search/person`;
    const parameters = this.getBaseParameters();

    parameters[`query`] = inputText;

    if (!!page) {
      parameters['page'] = page;
    }

    

    return this.httpClient
      .get<TmdbSearchResults<TmdbActorsSearch>>(requestUrl, {
        params: parameters,
      })
      .pipe(
        map((results: TmdbSearchResults<TmdbActorsSearch>) => {
          return this.adapter.adapt(results);
        })
      );
  }

  public getActorsSearch(
    inputText: string,
    id: number
  ): Observable<SearchResults<ActorsSearch>> {
    const requestUrl = `${this.getBaselineUrl()}/search/person`;
    const parameters = this.getBaseParameters();

    parameters[`query`] = inputText;

    return this.httpClient
      .get<TmdbSearchResults<TmdbActorsSearch>>(requestUrl, {
        params: parameters,
      })
      .pipe(
        map((results: TmdbSearchResults<TmdbActorsSearch>) => {
          return this.adapterSearch.adapt(this.filterRightActor(results, id));
        })
      );
  }

  private filterRightActor(
    results: TmdbSearchResults<TmdbActorsSearch>,
    id: number
  ) {
    var actorSearch: TmdbActorsSearch[] = [];
    results.results.forEach((element) => {
      if (element.id === id) {
        actorSearch.push(element);
      }
    });
    results.results = actorSearch;
    return results;
  }
}
