import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ActorsAdapter } from '../adapters/actors.adpater';
import { ActorsSearchAdapter } from '../adapters/search-actors.adpater';
import { Actors } from '../models/actors.model';
import { ActorsSearch } from '../models/search-actors.model';
import { TmdbSearchResults } from '../models/tmdb/tdmb-search-result.model';
import { TmdbSearchActorsResult } from '../models/tmdb/tmdb-search-actors.model';
import { TmdbSearchSimpleResult } from '../models/tmdb/tmdb-search-simple-result.model';
import { MovieDbService } from './movie-db.service';

@Injectable({
  providedIn: 'root'
})
export class ActorsSearchService extends MovieDbService {

  constructor(protected override httpClient: HttpClient, private adapter: ActorsSearchAdapter) {
    super(httpClient)
    this.adapter = adapter;
   }

  public getActors(inputText: string): Observable<ActorsSearch>{
    const requestUrl = `${this.getBaselineUrl()}/search/person`;
    const parameters = this.getBaseParameters();

      parameters[`query`] = inputText;

    return this.httpClient.get<TmdbSearchActorsResult>(
      requestUrl,
      {
        params: parameters
      }
    ).pipe(
      map((TmdbActorsSearch: TmdbSearchActorsResult) => {
        return this.adapter.adapt(TmdbActorsSearch);
      }
      )
    );
  } 
}
