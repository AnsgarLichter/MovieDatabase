import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ActorsAdapter } from '../adapters/actors.adpater';
import { ActorsSearchAdapter } from '../adapters/search-actors.adpater';
import { Actors } from '../models/actors.model';
import { ActorsSearch } from '../models/search-actors.model';
import { TmdbActors } from '../models/tmdb/tmdb-actors.model';
import { TmdbSearchActorsResult } from '../models/tmdb/tmdb-search-actors.model';
import { MovieDbService } from './movie-db.service';

@Injectable({
  providedIn: 'root'
})
export class ActorsService extends MovieDbService {

  constructor(protected override httpClient: HttpClient, private adapter: ActorsAdapter, private adapterActors: ActorsSearchAdapter) {
    super(httpClient)
    this.adapter = adapter;
   }

   public getActors(idActor: number, includeCombinedCredits: boolean): Observable<Actors>{
    const requestUrl = `${this.getBaselineUrl()}/person/${idActor}`;
    const parameters = this.getBaseParameters();

    const appendToResponse: string[] = [];
    if (includeCombinedCredits) {
      appendToResponse.push(`combined_credits`);
    }

    if(appendToResponse.length) {
      parameters[`append_to_response`] = appendToResponse.join(`,`);
    }

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
}