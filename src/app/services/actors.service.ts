import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ActorsAdapter } from '../adapters/actors.adpater';
import { Actors } from '../models/actors.model';
import { TmdbSearchResults } from '../models/tmdb/tdmb-search-result.model';
import { TmdbActors, TmdbSearchActorsResult } from '../models/tmdb/tmdb-actors.model';
import { TmdbSearchSimpleResult } from '../models/tmdb/tmdb-search-simple-result.model';
import { MovieDbService } from './movie-db.service';

@Injectable({
  providedIn: 'root'
})
export class ActorsService extends MovieDbService {

  constructor(protected override httpClient: HttpClient, private adapter: ActorsAdapter) {
    super(httpClient)
    this.adapter = adapter;
   }

  public getActors(inputText: string): Observable<Actors>{
    const requestUrl = `${this.getBaselineUrl()}/search/person`;
    const parameters = this.getBaseParameters();

      parameters[`query`] = inputText;

    return this.httpClient.get<TmdbSearchActorsResult>(
      requestUrl,
      {
        params: parameters
      }
    ).pipe(
      map((tmdbActors: TmdbSearchActorsResult) => {
        console.log("Service", tmdbActors);
        console.log("Result", this.adapter.adapt(tmdbActors));
        return this.adapter.adapt(tmdbActors);
      }
      )
    );
  } 
}
