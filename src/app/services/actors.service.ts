import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ActorsAdapter } from '../adapters/actors.adpater';
import { ActorsSearchAdapter } from '../adapters/search-actors.adpater';
import { Actors } from '../models/actors.model';
import { ActorsSearch } from '../models/search-actors.model';
import { TmdbSearchResults } from '../models/tmdb/tdmb-search-result.model';
import { TmdbActors } from '../models/tmdb/tmdb-actors.model';
import { TmdbActorsSearch, TmdbSearchActorsResult } from '../models/tmdb/tmdb-search-actors.model';
import { TmdbSearchSimpleResult } from '../models/tmdb/tmdb-search-simple-result.model';
import { MovieDbService } from './movie-db.service';

@Injectable({
  providedIn: 'root'
})
export class ActorsService extends MovieDbService {

  constructor(protected override httpClient: HttpClient, private adapter: ActorsAdapter, private adapterActors: ActorsSearchAdapter) {
    super(httpClient)
    this.adapter = adapter;
   }

   public getActors(idActor: number): Observable<Actors>{
    const requestUrl = `${this.getBaselineUrl()}/person/${idActor}`;
    const parameters = this.getBaseParameters();


    return this.httpClient.get<TmdbActors>(
      requestUrl,
      {
        params: parameters
      }
    ).pipe(
      map((tmdbActors: TmdbActors) => {
        return this.adapter.adapt(tmdbActors);
      }
      )
    );
  } 

  public getActorsDetails(inputText: string): Observable<ActorsSearch>{
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
        return this.adapterActors.adaptNew(TmdbActorsSearch);
      }
      )
    );
  } 

}
