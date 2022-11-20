import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {TmdbMovie} from '../models/tmdbMovieDto';
import {MovieDbService} from './movieDb.service';
import {MovieAdapter} from "../adapters/MovieAdapter";
import {Movie} from "../models/movieDto";

@Injectable({
  providedIn: 'root'
})
export class MoviesService extends MovieDbService {
  constructor(protected override httpClient: HttpClient, private adapter: MovieAdapter) {
    super(httpClient);

    this.adapter = adapter;
  }

  public getMovie(movieId: number, includeCredits: boolean, includeWatchProviders: boolean, includeKeywords: boolean): Observable<Movie> {
    let requestUrl = `${this.getBaselineUrl()}/movie/${movieId}?${this.getQueryParameterForApiKey()}`;
    //TODO: URL has to be valid even if only 1 further request should be included
    if (includeCredits) {
      requestUrl += `&append_to_response=credits`;
    }

    if (includeWatchProviders) {
      requestUrl += `,watch/providers`
    }

    if (includeKeywords) {
      requestUrl += ",keywords"
    }

    return this.httpClient.get<TmdbMovie>(requestUrl).pipe(
      map((movie: TmdbMovie) => this.adapter.adapt(movie))
    );
  }

}
