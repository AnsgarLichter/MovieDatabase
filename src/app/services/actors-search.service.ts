import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ActorsSearchAdapter } from '../adapters/search-actors.adpater';
import { ActorsSearchFlat } from '../models/search-actors-new.model';
import { TmdbSearchActorsResult } from '../models/tmdb/tmdb-search-actors.model';
import { MovieDbService } from './movie-db.service';

@Injectable({
  providedIn: 'root'
})
export class ActorsSearchService extends MovieDbService {

  constructor(protected override httpClient: HttpClient, private adapter: ActorsSearchAdapter) {
    super(httpClient)
    this.adapter = adapter;
   }

  public getActors(inputText: string): Observable<ActorsSearchFlat[]>{
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
